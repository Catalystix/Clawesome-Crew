import React from "react";
import { render } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom";
import MarsRover from "."; //!check path name for this
import Auth from "../../utils/auth";

//! should probably make these async like the articles one so they work with API if time allows

//test to check for unauthorized access to Mars Rover Photos
test("should render an error message when trying to access Mars Rover Photos without logging in", () => {
    Auth.loggedIn.mockReturnValue(false);
    const { getByText } = render(
    <MemoryRouter initialEntries={["/mars-rover-photos"]}>
        <MarsRover />
    </MemoryRouter>
    );
    expect(
    getByText("You need to be logged in to view this content.")
    ).toBeInTheDocument();
});

// Test to check for authorized access to Mars Rover Photos
test("should render Mars Rover Photos when user is logged in", () => {
    Auth.loggedIn.mockReturnValue(true);

    const { getByTestId } = render(
      <MemoryRouter initialEntries={["/mars-rover-photos"]}>
        <MarsRover />
      </MemoryRouter>
    );

    expect(getByTestId("mars-rover-photos")).toBeInTheDocument();
  });