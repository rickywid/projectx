import * as React from "react";
import { Router } from "react-router-dom";
import {
  render,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
  cleanup,
  screen,
  getByText,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "./matchmedia.mock";
import history from "../lib/history";
import ProjectUpload from "../components/projectUpload";

/**
 * https://kentcdodds.com/blog/test-isolation-with-react
 * youtube.com/watch?time_continue=3&v=yhUep7E9O20&feature=emb_logo
 */

let projectTitleEl: HTMLElement;
let projectHeaderEl: HTMLElement;
let projectTaglineEl: HTMLElement;
let projectDescriptionEl: HTMLElement;
let projectWebsiteEl: HTMLElement;
let projectRepoEl: HTMLElement;
let projectTypeEl: HTMLElement;
let projectWebsiteInputEl: HTMLElement;
let projectRepoInputEl: HTMLElement;

describe("Project Upload component specs", () => {
  afterEach(cleanup);

  beforeEach(async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ isAuthenticated: true }));

    const utils = render(
      <React.StrictMode>
        <Router history={history}>
          <ProjectUpload />
        </Router>
      </React.StrictMode>
    );

    await waitFor(() => {
      projectTitleEl = utils.getByTestId("label-title");
      projectTaglineEl = utils.getByTestId("label-tagline");
      projectDescriptionEl = utils.getByTestId("label-description");
      projectWebsiteEl = utils.getByTestId("label-website");
      projectRepoEl = utils.getByTestId("label-repo");
      projectTypeEl = utils.getByTestId("label-type");
      projectHeaderEl = utils.getByTestId("project-header");
      projectWebsiteInputEl = utils.getByTestId("website-input");
      projectRepoInputEl = utils.getByTestId("repo-input");
    });
  });

  it("check that user is authenticated before accessing the upload page", () => {
    expect(projectHeaderEl).toBeInTheDocument();
  });

  it("check that project title, tagline, description, website, project type form fields is required", async () => {
    expect(
      projectTitleEl.getElementsByClassName("ant-form-item-required")
    ).toBeTruthy();
    expect(
      projectTaglineEl.getElementsByClassName("ant-form-item-required")
    ).toBeTruthy();
    expect(
      projectDescriptionEl.getElementsByClassName("ant-form-item-required")
    ).toBeTruthy();
    expect(
      projectWebsiteEl.getElementsByClassName("ant-form-item-required")
    ).toBeTruthy();
    expect(
      projectTypeEl.getElementsByClassName("ant-form-item-required")
    ).toBeTruthy();
  });

  it("check that website url is valid", async () => {
    userEvent.type(projectWebsiteInputEl, "https://google.");
    await waitFor(() => {
      expect(
        projectWebsiteEl.classList.contains("ant-form-item-has-error")
      ).toBeTruthy();
    });

    userEvent.type(projectWebsiteInputEl, "https://google.com");
    await waitForElementToBeRemoved(() => screen.getByText("Invalid Url"));
    expect(
      projectWebsiteEl.classList.contains("ant-form-item-has-error")
    ).toBeFalsy();
  });

  it("check that repo url is valid", async () => {
    userEvent.type(projectRepoInputEl, "https://google.");
    await waitFor(() => {
      expect(
        projectRepoEl.classList.contains("ant-form-item-has-error")
      ).toBeTruthy();
    });

    userEvent.type(projectRepoInputEl, "https://google.com");
    await waitForElementToBeRemoved(() => screen.getByText("Invalid Url"));
    expect(
      projectRepoEl.classList.contains("ant-form-item-has-error")
    ).toBeFalsy();
  });
});
