import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";
import Auth from "../../utils/auth";
jest.mock("../../utils/auth");

//1. The Header component should render correctly with the Login and Signup buttons when the user is not logged in.

//2. The Header component should render correctly with the profile and logout buttons when the user is logged in.

//3. The Header component should call the Auth.logout method when the Logout button is clicked.


//tests for basic logged in and not logged in header rendering
describe("Header component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  //test for how header should look like when not logged in
    test("should render header correctly with Login and Signup buttons when not logged in", () => {
        Auth.loggedIn.mockReturnValue(false);
        const { getByText } = render(
        <MemoryRouter>
            <Header />
        </MemoryRouter>
        );
        expect(getByText("Images and Articles")).toBeInTheDocument();
        expect(getByText("Check out this shit")).toBeInTheDocument();
        expect(getByText("Login")).toBeInTheDocument();
        expect(getByText("Signup")).toBeInTheDocument();
    });

  //test for how header should look like when logged in
    test("should render correctly with profile and logout buttons when logged in", () => {
        Auth.loggedIn.mockReturnValue(true);
        Auth.getProfile.mockReturnValue({ data: { username: "testUser" } });
        const { getByText } = render(
        <MemoryRouter>
            <Header />
        </MemoryRouter>
        );
        expect(getByText("Images and Articles")).toBeInTheDocument();
        expect(getByText("Check out this shit")).toBeInTheDocument();
        expect(getByText("testUser's profile")).toBeInTheDocument();
        expect(getByText("Logout")).toBeInTheDocument();
    });

  //test for logging out
    test("should call Auth.logout() when Logout button is clicked", () => {
        Auth.loggedIn.mockReturnValue(true);
        const { getByText } = render(
        <MemoryRouter>
            <Header />
        </MemoryRouter>
        );
        fireEvent.click(getByText("Logout"));
        expect(Auth.logout).toHaveBeenCalledTimes(1);
    });
});

//tests to check for Article API rendering
describe("Article rendering", () => {
    //test to check rendered articles when logged in
    describe("When user is logged in", () => {
        test("Should render articles", async () => {
            const testArticles = [
                {id: 1, title: "Article 1", content: "This is article 1"},
                {id: 2, title: "Article 2", content: "This is article 2"},
                {id: 3, title: "Article 3", content: "This is article 3"}
            ];

            //simulate successful authentication
            Auth.loggedIn.mockReturnValue(true);

            //simulate successful fetch of article data
            fetchMock.mockResponseOnce(JSON.stringify(articlesData));

            const { findAllByTestId } = render(
                <MemoryRouter initialEntries={["/articles"]}>
                    <Header />
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
            //Generate test data with different article IDs
            const testArticles = [
                {id: 1, title: "Article 1", content: "This is article 1"},
                {id: 2, title: "Article 2", content: "This is article 2"},
                {id: 3, title: "Article 3", content: "This is article 3"}
            ];

            //simulate unsuccessful authentication
            Auth.loggedIn.mockReturnValue(false);

            //Reset fetchMock
            fetchMock.resetMocks();

            //Simulate unsuccessful fetch of articles data
            fetchMock.mockRejectedValueOnce(new Error("Unauthorized"));

            //Navigate to articles page again
            const { getByText } = render(
                <MemoryRouter initialEntries={["/articles"]}>
                    <Header />
                </MemoryRouter>
            );

            //Expect unauthorized message to appear
            expect(
                getByText("You need to be logged in to view this content.")).toBeInTheDocument();
            });

            test("should display an error message when trying to access an individual article", async () => {
                const testArticles = [
                {id: 1, title: "Article 1", content: "This is article 1"},
                {id: 2, title: "Article 2", content: "This is article 2"},
                {id: 3, title: "Article 3", content: "This is article 3"}
                ];

                //simulate unsuccessful authentication
                Auth.loggedIn.mockReturnValue(false);

                //generate initialEntries with different article IDs
                const initialEntries = testArticles.map((article) => `/article/${article.id}`);

                const { getByText } = render(
                    <MemoryRouter initialEntries={initialEntries}>
                        <Header />
                    </MemoryRouter>
                );

                expect(
                    getByText("You need to be logged in to view this content")).toBeInTheDocument();
                });
            });
    });








  //test to check for unauthorized access to Mars Rover Photos
    test("should render an error message when trying to access Mars Rover Photos without logging in", () => {
        Auth.loggedIn.mockReturnValue(false);
        const { getByText } = render(
        <MemoryRouter initialEntries={["/mars-rover-photos"]}>
            <Header />
        </MemoryRouter>
        );
        expect(
        getByText("You need to be logged in to view this content.")
        ).toBeInTheDocument();
    });

  //test to check for unauthorized access to Tech Transfer
    test("should render an error message when trying to access Tech Transfer without logging in", () => {
        Auth.loggedIn.mockReturnValue(false);
        const { getByText } = render(
        <MemoryRouter initialEntries={["/tech-transfer"]}>
            <Header />
        </MemoryRouter>
        );
        expect(
        getByText("You need to be logged in to view this content.")
        ).toBeInTheDocument();
    });

