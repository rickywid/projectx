import React, { useEffect, useState } from "react";
import ProjectFilters from "./projectFilters";
import ProjectsCard from "./projectCard";
import ResultsHeader from "./resultsHeader";
import Spinner from "./spinner";
import NotFound from "./notFound";
import Masthead from "./masthead";

import ApiService from "../lib/apiService";

const ProjectsCollaboration = () => {
  const api = new ApiService();
  const [projects, setProjects] = useState([]);
  const [resultsCount, setResultsCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    const fetch = async () => {
      setIsLoading(true);
      const projectsFetch = await api.getProjectsByType("collaboration", 1, 20);
      const projects = await projectsFetch.json();
      const userFetch = await api.userAuth();
      const user = await userFetch.json();
      setIsAuthenticated(user.isAuthenticated);
      setProjects(projects.data);
      setHasMore(projects.hasMore);
      setResultsCount(projects.data.length);
      setIsLoading(false);
    };

    fetch();
  }, []);

  const fetchData = async () => {
    const res = await api.getProjectsByType(
      "collaboration",
      currentPage + 1,
      20
    );
    const json = await res.json();

    setCurrentPage(currentPage + 1);
    setHasMore(json.hasMore);
    setProjects(projects.concat(json.data));
  };

  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          {!isAuthenticated ? <Masthead /> : ""}
          <ProjectFilters />
          {projects.length > 0 ? (
            <>
              <div className="tags-wrapper">
                <ResultsHeader count={resultsCount} name="Collaboration" />
                <ProjectsCard
                  projects={projects}
                  fetchData={fetchData}
                  hasMore={hasMore}
                />
              </div>
            </>
          ) : (
            <NotFound
              header="No results found"
              subHeader="We couldn't find any projects. Try another search."
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectsCollaboration;
