import React, { useEffect } from "react";
import { siteName } from "../lib/const";
import "../styles/form.scss";

const Faq = () => {
  useEffect(() => {
    document.title = `${siteName} - Frequently Asked Questions`;
  });

  return (
    <div className="bg guidelines">
      <h1>Frequently Asked Questions</h1>
      <p>
        <strong>
          I logged in with my account but the the navigation bar shows I am
          still not authenticated.
        </strong>
      </p>
      <p>
        The site uses cookies for user authentication and authorization. Please
        check or try the following:
      </p>
      <ul>
        <li>Cookies is enabled in your browser settings.</li>
        <li>
          Any browser extensions (UBlock, Privacy Badger etc..) that could be
          blocking cookies on this site.
        </li>
        <li>Try logging in on a different device or browser.</li>
      </ul>
      <p>
        If you're still having issues, send us an email at{" "}
        <a href="mailto: codeconcept.contact@gmail.com">
          codeconcept.contact@gmail.com
        </a>
      </p>
    </div>
  );
};

export default Faq;
