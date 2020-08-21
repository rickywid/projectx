import * as React from "react";
import { Router } from "react-router-dom";
import {
  render,
  fireEvent,
  waitFor,
  cleanup,
  screen,
  getByTestId,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "./matchmedia.mock";
import history from "../lib/history";
import Login from "../components/auth/login";

/**
 * https://kentcdodds.com/blog/test-isolation-with-react
 * youtube.com/watch?time_continue=3&v=yhUep7E9O20&feature=emb_logo
 */

describe("Signup component specs", () => {
  it("check that username and password fields are empty", () => {
    const { getByTestId } = render(
      <div>
        <p data-testid="hello">hello world</p>
      </div>
    );

    expect(getByTestId("hello")).toHaveTextContent("hello world");
  });
});
