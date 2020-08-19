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
import Signup from "../components/auth/signup";

/**
 * https://kentcdodds.com/blog/test-isolation-with-react
 * youtube.com/watch?time_continue=3&v=yhUep7E9O20&feature=emb_logo
 */

let usernameInputEl: HTMLElement;
let emailInputEl: HTMLElement;
let passwordInputEl: HTMLElement;
let passwordConfirmInputEl: HTMLElement;
let inputCheckboxEl: HTMLInputElement;
let buttonElement: HTMLElement;

describe("Signup component specs", () => {
  afterEach(cleanup);

  beforeEach(() => {
    const utils = render(
      <React.StrictMode>
        <Router history={history}>
          <Signup />
        </Router>
      </React.StrictMode>
    );

    usernameInputEl = utils.getByLabelText("Username");
    emailInputEl = utils.getByLabelText("E-mail");
    passwordInputEl = utils.getByLabelText("Password");
    passwordConfirmInputEl = utils.getByLabelText("Confirm Password");
    inputCheckboxEl = utils.getByTestId("signup-checkbox");
    buttonElement = utils.getByTestId("signup-btn");
  });

  it("check that signup form fields are empty", () => {
    fireEvent.click(buttonElement);

    expect(emailInputEl.innerHTML).toBeFalsy();
    expect(usernameInputEl.innerHTML).toBeFalsy();
    expect(passwordInputEl.innerHTML).toBeFalsy();
    expect(passwordConfirmInputEl.innerHTML).toBeFalsy();
  });

  it("show error if email exists", async () => {
    userEvent.type(emailInputEl, "bob@email.com");
    userEvent.type(usernameInputEl, "bob");
    userEvent.type(passwordInputEl, "password");
    userEvent.type(passwordConfirmInputEl, "password");
    userEvent.click(inputCheckboxEl);
    userEvent.click(buttonElement);

    fetchMock.mockResponseOnce(
      JSON.stringify({ status: "error", message: "email already taken" })
    );

    expect(emailInputEl).toHaveValue("bob@email.com");
    expect(usernameInputEl).toHaveValue("bob");
    expect(passwordInputEl).toHaveValue("password");
    expect(passwordConfirmInputEl).toHaveValue("password");
    expect(inputCheckboxEl.checked).toEqual(true);

    await waitFor(() => {
      expect(screen.getByTestId("error-msg")).toHaveTextContent(
        "email already taken"
      );
    });
  });

  it("show error if username exists", async () => {
    userEvent.type(emailInputEl, "bob@email.com");
    userEvent.type(usernameInputEl, "bob");
    userEvent.type(passwordInputEl, "password");
    userEvent.type(passwordConfirmInputEl, "password");
    userEvent.click(inputCheckboxEl);
    userEvent.click(buttonElement);

    fetchMock.mockResponseOnce(
      JSON.stringify({ status: "error", message: "username already taken" })
    );

    expect(emailInputEl).toHaveValue("bob@email.com");
    expect(usernameInputEl).toHaveValue("bob");
    expect(passwordInputEl).toHaveValue("password");
    expect(passwordConfirmInputEl).toHaveValue("password");
    expect(inputCheckboxEl.checked).toEqual(true);

    await waitFor(() => {
      expect(screen.getByTestId("error-msg")).toHaveTextContent(
        "username already taken"
      );
    });
  });

  it("show error if rules input is not checked", async () => {
    userEvent.type(emailInputEl, "bob@email.com");
    userEvent.type(usernameInputEl, "bob");
    userEvent.type(passwordInputEl, "password");
    userEvent.type(passwordConfirmInputEl, "password");
    userEvent.click(buttonElement);

    await waitFor(() => {
      expect(screen.getByText("Required")).toBeInTheDocument();
    });
  });
});
