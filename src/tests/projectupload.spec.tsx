import * as React from "react";
import { Router } from "react-router-dom";
import {
  render,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
  cleanup,
  screen,
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
let projectTechnologiesEl: HTMLElement;
let projectTagsEl: HTMLElement;
let projectWebsiteInputEl: HTMLElement;
let projectRepoInputEl: HTMLElement;
let projectFileUploadEl: HTMLElement;
let projectSubmitBtn: HTMLElement;

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
      projectTechnologiesEl = utils.getByTestId("label-technologies");
      projectTagsEl = utils.getByTestId("label-tags");
      projectHeaderEl = utils.getByTestId("project-header");
      projectWebsiteInputEl = utils.getByTestId("website-input");
      projectRepoInputEl = utils.getByTestId("repo-input");
      projectFileUploadEl = utils.getByTestId("file-upload");
      projectSubmitBtn = utils.getByTestId("submit-btn");
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
    expect(
      projectTechnologiesEl.getElementsByClassName("ant-form-item-required")
    ).toBeTruthy();
    expect(
      projectTagsEl.getElementsByClassName("ant-form-item-required")
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

  it("check that project submits successfully ", async () => {
    userEvent.type(
      projectTitleEl.getElementsByTagName("input")[0],
      "CodeConcept"
    );
    userEvent.type(
      projectTaglineEl.getElementsByTagName("input")[0],
      "Discover side projects built by the dev community"
    );
    userEvent.type(
      projectDescriptionEl.getElementsByTagName("textarea")[0],
      "Some project description"
    );
    userEvent.type(projectWebsiteInputEl, "https://beta.codeconcept.io");
    userEvent.type(projectRepoInputEl, "https://beta.codeconcept.io");

    fireEvent.mouseDown(projectTypeEl.getElementsByTagName("input")[0]);
    await waitFor(() =>
      expect(screen.getByText("Front End")).toBeInTheDocument()
    );
    fireEvent.click(screen.getByText("Front End"));

    fireEvent.mouseDown(projectTechnologiesEl.getElementsByTagName("input")[0]);
    await waitFor(() => expect(screen.getByText("JQuery")).toBeInTheDocument());
    fireEvent.click(screen.getByText("JQuery"));

    fireEvent.mouseDown(projectTagsEl.getElementsByTagName("input")[0]);
    await waitFor(() =>
      expect(screen.getByText("Analytics")).toBeInTheDocument()
    );
    fireEvent.click(screen.getByText("Analytics"));

    // Submit Project Mock Response
    fetchMock.mockResponseOnce(
      JSON.stringify({
        status: "ok",
        uuid: "fd5ceacc-e05a-464b-9010-093f09e01e43",
      })
    );

    userEvent.click(projectSubmitBtn);

    await waitFor(() =>
      screen.getByText(
        "Congratulations! Your project has been successfully uploaded."
      )
    );
    expect(
      screen.getByText(
        "Congratulations! Your project has been successfully uploaded."
      )
    ).toBeInTheDocument();
  });

  it("check that upload image is jpeg, jpg, png, gif file type", async () => {
    // TODO
  });

  it("check that upload image is less than or equal to 800kb", async () => {
    // TODO
  });

  it("check that placeholder image is used if user did not upload an image", async () => {
    // TODO
  });

  it("check that project submit button is disabled if upload image fails and is enabled when upload is successful on re-upload ", async () => {
    // TODO
  });
});
