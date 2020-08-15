import React, { useEffect } from "react";
import { siteName } from "../lib/const";
import "../styles/form.scss";

const Feedback = () => {
  useEffect(() => {
    document.title = `${siteName} - Feedback`;
  });

  return (
    <div className="bg guidelines">
      <h1>Feedback</h1>
      <p>
        The website is continously being updated with new features and changes
        to improve the experience for our users.
      </p>
      <p>
        If you have any feedback/suggestions or you would like to contribute,
        send me an email at{" "}
        <a href="mailto: codeconcept.contact@gmail.com">
          codeconcept.contact@gmail.com
        </a>
        .
      </p>
    </div>
  );
};

export default Feedback;
