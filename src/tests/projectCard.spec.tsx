import * as React from "react";
import { Router } from "react-router-dom";
import { render, waitFor, cleanup, screen } from "@testing-library/react";
import "./matchmedia.mock";
import history from "../lib/history";
import ProjectCard from "../components/projectCard";

/**
 * https://kentcdodds.com/blog/test-isolation-with-react
 * youtube.com/watch?time_continue=3&v=yhUep7E9O20&feature=emb_logo
 */

let rr: any;
let projectCardImgEl: HTMLElement;
let projectCardTitleEl: HTMLElement;
let projectCardOwnerEl: HTMLElement;
let projectCardProfileImgEl: HTMLElement;
let projectCardCommentCountEl: HTMLElement;
let projectCardLikeCountEl: HTMLElement;
let projectCardTagLeadEl: HTMLElement;
let projectCardTagEl: HTMLElement;
let projectCardTagCountEl: HTMLElement;

describe("ProjectCard component specs", () => {
  afterEach(cleanup);

  beforeEach(() => {
    const data = [
      {
        collaboration: false,
        comment_count: "0",
        description: "A really cool project",
        gh_avatar: "/static/media/016-goose.456bcefe.png",
        images: ["/static/media/113-workstation.5a431524.png"],
        likes_count: "0",
        name: "CODECOMPLEX",
        tagline: "Discover the best projects!!!",
        tags: ["analytics"],
        technologies: ["jquery"],
        url: "instagram.com",
        user_id: 126,
        username: "bill",
        uuid: "f5c86eb9-ce20-47d4-a18c-186fa407c72b",
      },
    ];

    const utils = render(
      <React.StrictMode>
        <Router history={history}>
          <ProjectCard
            projects={data}
            fetchData={() => {}}
            hasMore={false}
            isOwner={false}
          />
        </Router>
      </React.StrictMode>
    );

    projectCardTitleEl = utils.getByTestId("title");
    projectCardImgEl = utils.getByTestId("card");
    projectCardOwnerEl = utils.getByTestId("owner");
    projectCardProfileImgEl = utils.getByTestId("profile-image");
    projectCardCommentCountEl = utils.getByTestId("comment-count");
    projectCardLikeCountEl = utils.getByTestId("like-count");
    projectCardTagEl = utils.getByTestId("tag");
    rr = utils.rerender;
  });

  it(`check that project title, image, owner name/image, comment count, like count, project tag(s) is showing`, () => {
    expect(projectCardImgEl).toHaveStyle(
      `background-size: url("/static/media/113-workstation.5a431524.png"); background-size: cover`
    );
    expect(projectCardTitleEl).toHaveTextContent("CODECOMPLEX");
    expect(projectCardOwnerEl).toHaveTextContent("bill");
    expect(projectCardProfileImgEl).toBeInTheDocument();
    expect(projectCardCommentCountEl).toHaveTextContent("0");
    expect(projectCardLikeCountEl).toHaveTextContent("0");
    expect(projectCardTagEl).toHaveTextContent("analytics");
  });

  it("check that if project tag has multiple tags then project card shows '+<tag_count>' onHover", async () => {
    const data = [
      {
        collaboration: false,
        comment_count: "0",
        description: "A really cool project",
        gh_avatar: "/static/media/016-goose.456bcefe.png",
        images: ["/static/media/113-workstation.5a431524.png"],
        likes_count: "0",
        name: "CODECOMPLEX",
        tagline: "Discover the best projects!!!",
        tags: ["analytics", "productivity"],
        technologies: ["jquery"],
        url: "instagram.com",
        user_id: 126,
        username: "bill",
        uuid: "f5c86eb9-ce20-47d4-a18c-186fa407c72b",
      },
    ];

    rr(
      <React.StrictMode>
        <Router history={history}>
          <ProjectCard
            projects={data}
            fetchData={() => {}}
            hasMore={false}
            isOwner={false}
          />
        </Router>
      </React.StrictMode>
    );

    await waitFor(() => {
      projectCardTagLeadEl = screen.getByTestId("tag-lead");
      projectCardTagCountEl = screen.getByTestId("tag-count");
    });

    expect(projectCardTagLeadEl).toBeInTheDocument();
    expect(projectCardTagCountEl).toBeInTheDocument();
    expect(projectCardTagCountEl).toHaveTextContent(
      String(data[0].tags.length - 1)
    );
  });

  it("check that project title is truncated if length is greater than 30 characters", async () => {
    const data = [
      {
        collaboration: false,
        comment_count: "0",
        description: "A really cool project",
        gh_avatar: "/static/media/016-goose.456bcefe.png",
        images: ["/static/media/113-workstation.5a431524.png"],
        likes_count: "0",
        name: "CSS Binary Coded Decimal 7 Segment Display Decoder",
        tagline: "Discover the best projects!!!",
        tags: ["analytics", "productivity"],
        technologies: ["jquery"],
        url: "instagram.com",
        user_id: 126,
        username: "bill",
        uuid: "f5c86eb9-ce20-47d4-a18c-186fa407c72b",
      },
    ];

    rr(
      <React.StrictMode>
        <Router history={history}>
          <ProjectCard
            projects={data}
            fetchData={() => {}}
            hasMore={false}
            isOwner={false}
          />
        </Router>
      </React.StrictMode>
    );

    await waitFor(() => {
      projectCardTitleEl = screen.getByTestId("title");
    });

    expect(projectCardTitleEl).toHaveTextContent("CSS Binary Coded Decima...");
  });
});
