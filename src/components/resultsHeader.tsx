import React from "react";

interface Props {
  count?: number;
  name: string | null;
}

const ResultsHeader = ({ count, name }: Props) => {
  return (
    <p>
      <strong>
        {count} {count ? (count > 1 ? "results for" : "result for") : ""} {name}{" "}
        Projects
      </strong>
    </p>
  );
};

export default ResultsHeader;
