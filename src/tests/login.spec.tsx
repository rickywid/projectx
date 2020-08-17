import * as React from "react";
import { Router } from "react-router-dom";
import { render, fireEvent, wait, cleanup } from "@testing-library/react";
import "./matchmedia.mock";
import history from "../lib/history";
import Login from "../components/auth/login";
import AuthService from "../lib/authService";

/**
 * https://kentcdodds.com/blog/test-isolation-with-react
 * youtube.com/watch?time_continue=3&v=yhUep7E9O20&feature=emb_logo
 */

let usernameInput: HTMLElement;
let passwordInput: HTMLElement;
let buttonElement: HTMLElement;
let usernameErrorText: Promise<HTMLElement>;
let passwordErrorText: Promise<HTMLElement>;
let signinErrorText: Promise<HTMLElement>;

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
    usernameErrorText = utils.findByText("Please input your Username!");
    passwordErrorText = utils.findByText("Please input your Password!");
    signinErrorText = utils.findByTestId("login-error");
  });

  it("check that username and password fields are empty", async () => {
    expect(usernameInput.innerHTML).toBeFalsy();
    expect(passwordInput.innerHTML).toBeFalsy();
  });

  it("show login error if email/password is blank when logging in", async () => {
    fireEvent.click(buttonElement);
    await wait(() => {
      expect(usernameErrorText).toBeTruthy();
      expect(passwordErrorText).toBeTruthy();
    });
  });

  it("show login error if email/password credentials is incorrect", async () => {
    const api = new AuthService();
    const username = "bob";
    const password = "someverywrongpassword";
    const form = new FormData();

    fireEvent.change(usernameInput, { target: { value: username } });
    fireEvent.change(passwordInput, { target: { value: password } });

    form.append("username", username);
    form.append("password", password);
    fireEvent.click(buttonElement);

    // Most Response
    fetchMock.mockResponseOnce(JSON.stringify({ status: 200 }));

    const loginFetch = await api.login(form);
    const login = await loginFetch.json();

    if (login.status !== 200) {
      expect(signinErrorText).toBe("Username or password is incorrect");
    }
  });
});
