import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ArticleList from "./Article"; //!double check this pat...import ??? from ArticleList??
import Auth from "../../utils/auth"; //!double check this path
import fetchMock from "jest-fetch-mock";

jest.mock("../../utils/auth");
fetchMock.enableMocks();

//tests to check for Article API rendering
describe("Article rendering", () => {
  //test to check rendered articles when logged in
  describe("When user is logged in", () => {
    test("Should render articles", async () => {
      const testArticles = [
        { id: 1, title: "Article 1", content: "This is article 1" },
        { id: 2, title: "Article 2", content: "This is article 2" },
        { id: 3, title: "Article 3", content: "This is article 3" },
      ];

      Auth.loggedIn.mockReturnValue(true);

      //simulate successful fetch of article data
      fetchMock.mockResponseOnce(JSON.stringify(testArticles));

      //!Need to change this to match correct path
      const { findAllByTestId } = render(
        <MemoryRouter initialEntries={["/articles"]}>
          //!also need to change this to correct component name
          <ArticleList
            articles={testArticles}
            title="Article List"
            showTitle={true}
            showUsername={true}
          />
        </MemoryRouter>
      );

      //check that articles are rendered when logged in
      const articles = await findAllByTestId("article");
      expect(articles).toHaveLength(3);
    });
  });

  //test to check that an error message is displayed if User is not logged in
  describe("When user is not logged in", () => {
    test("should display an error message when trying to access articles", async () => {
      Auth.loggedIn.mockReturnValue(false);

      fetchMock.resetMocks();

      fetchMock.mockRejectedValueOnce(new Error("Unauthorized"));

      //!Need to change this to match correct path
      const { getByText } = render(
        <MemoryRouter initialEntries={["/articles"]}>
          //!also need to change this to correct component name
          <ArticleList
            articles={[]}
            title="Article List"
            showTitle={true}
            showUsername={true}
          />
        </MemoryRouter>
      );

      //Expect unauthorized message to appear
      expect(
        getByText("You need to be logged in to view this content.")
      ).toBeInTheDocument();
    });

    test("should display an error message when trying to access an individual article", async () => {
      const testArticles = [
        { id: 1, title: "Article 1", content: "This is article 1" },
        { id: 2, title: "Article 2", content: "This is article 2" },
        { id: 3, title: "Article 3", content: "This is article 3" },
      ];

      Auth.loggedIn.mockReturnValue(false);

      //generate initialEntries with different article IDs
      //!Need to change this to match correct path
      const initialEntries = testArticles.map(
        (article) => `/article/${article.id}`
      );

      const { getByText } = render(
        <MemoryRouter initialEntries={initialEntries}>
          //!also need to change this to correct component name
          <ArticleList
            articles={testArticles}
            title="Article List"
            showTitle={true}
            showUsername={true}
          />
        </MemoryRouter>
      );

      expect(
        getByText("You need to be logged in to view this content")
      ).toBeInTheDocument();
    });
  });
});
