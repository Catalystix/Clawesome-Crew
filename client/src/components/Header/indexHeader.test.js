import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header"; //!double check this path
import Auth from "../../utils/auth"; //!double check this path
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

