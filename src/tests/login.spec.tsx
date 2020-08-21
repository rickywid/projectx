import * as React from "react";
import { Router } from "react-router-dom";
import {
  render,
  fireEvent,
  waitFor,
  cleanup,
  screen,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "./matchmedia.mock";
import history from "../lib/history";
import Login from "../components/auth/login";

/**
 * https://kentcdodds.com/blog/test-isolation-with-react
 * youtube.com/watch?time_continue=3&v=yhUep7E9O20&feature=emb_logo
 */
let usernameInput: HTMLElement;
let passwordInput: HTMLElement;
let buttonElement: HTMLElement;

describe("Signup component specs", () => {
  afterEach(cleanup);

  beforeEach(() => {
    const utils = render(
      <React.StrictMode>
        <Router history={history}>
          <Login />
        </Router>
      </React.StrictMode>
    );

    usernameInput = utils.getByPlaceholderText("Username");
    passwordInput = utils.getByPlaceholderText("Password");
    buttonElement = utils.getByTestId("login-btn");
  });

  it("check that username and password fields are empty", () => {
    expect(usernameInput).toHaveTextContent("");
    expect(passwordInput).toHaveTextContent("");
  });

  it("show login error if email/password is blank when logging in", async () => {
    fireEvent.click(buttonElement);
    await waitFor(() => {
      expect(
        screen.getByText("Please input your Username!")
      ).toBeInTheDocument();
      expect(
        screen.getByText("Please input your Password!")
      ).toBeInTheDocument();
    });
  });

  it("show login error if email/password credentials is incorrect", async () => {
    const username = "bob";
    const password = "someverywrongpassword";

    userEvent.type(usernameInput, username);
    userEvent.type(passwordInput, password);
    userEvent.click(buttonElement);

    fetchMock.mockResponseOnce(
      JSON.stringify({
        authenticated: false,
        message: "Incorrect username or password",
      })
    );
    await waitFor(() =>
      expect(screen.getByTestId("login-error")).toHaveTextContent(
        "Incorrect username or password"
      )
    );
  });
});
