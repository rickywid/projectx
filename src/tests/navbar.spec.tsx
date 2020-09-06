import * as React from "react";
import { Router } from "react-router-dom";
import {
  render,
  fireEvent,
  waitFor,
  cleanup,
  screen,
  act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "./matchmedia.mock";
import history from "../lib/history";
import Navbar from "../components/navbar";

let rr: any;
let loginBtn: HTMLElement;
let signupBtn: HTMLElement;
let uploadBtn: HTMLElement;
let profileBadge: HTMLElement;
let profileButton: HTMLElement;
let signoutBtn: HTMLElement;
let technologiesLink: HTMLElement;
let categoriesLink: HTMLElement;

describe("Project Upload component specs", () => {
  afterEach(cleanup);

  beforeEach(async () => {
    act(() => {
      // set window size
      global.innerWidth = 1400;
      fireEvent(window, new Event("resize"));
    });

    fetchMock.mockResponseOnce(JSON.stringify({ isAuthenticated: false }));

    const utils = render(
      <React.StrictMode>
        <Router history={history}>
          <Navbar
            user={{ username: "", gh_avatar: "" }}
            isAuthenticated={false}
            loading={false}
          />
        </Router>
      </React.StrictMode>
    );

    await waitFor(() => {
      categoriesLink = utils.getByTestId("categories");
      technologiesLink = utils.getByTestId("technologies");
      loginBtn = utils.getByTestId("login-btn");
      signupBtn = utils.getByTestId("signup-btn");
      rr = utils.rerender;
    });
  });

  it("check that login and signup buttons is displayed if user is not authenticated", async () => {
    expect(loginBtn).toBeInTheDocument();
    expect(signupBtn).toBeInTheDocument();
    expect(categoriesLink).toBeInTheDocument();
    expect(technologiesLink).toBeInTheDocument();
  });

  it("check that Technologies/Categories links show all the time", async () => {
    expect(categoriesLink).toBeInTheDocument();
    expect(technologiesLink).toBeInTheDocument();

    rr(
      <React.StrictMode>
        <Router history={history}>
          <Navbar
            user={{
              username: "octocat",
              gh_avatar:
                "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
            }}
            isAuthenticated={true}
            loading={false}
          />
        </Router>
      </React.StrictMode>
    );

    expect(categoriesLink).toBeInTheDocument();
    expect(technologiesLink).toBeInTheDocument();
  });

  it("check that signout/user profile badge buttons is displayed if user is authenticated", async () => {
    rr(
      <React.StrictMode>
        <Router history={history}>
          <Navbar
            user={{
              username: "octocat",
              gh_avatar:
                "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
            }}
            isAuthenticated={true}
            loading={false}
          />
        </Router>
      </React.StrictMode>
    );

    await waitFor(() => {
      uploadBtn = screen.getByTestId("upload-btn");
      profileBadge = screen.getByTestId("profile-badge");
    });

    expect(uploadBtn).toBeInTheDocument();
    expect(profileBadge).toBeInTheDocument();
    expect(loginBtn).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId("profile-badge"));
    await waitFor(() => {
      profileButton = screen.getByTestId("profile-btn");
      signoutBtn = screen.getByTestId("signout-btn");
    });

    expect(profileButton).toBeInTheDocument();
    expect(signoutBtn).toBeInTheDocument();
  });
});
