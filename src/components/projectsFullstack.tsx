import React, { useEffect, useState } from "react";
import ProjectFilters from "./projectFilters";
import ProjectsCard from "./projectCard";
import ResultsHeader from "./resultsHeader";
import Spinner from "./spinner";
import NotFound from "./notFound";
import ApiService from "../lib/apiService";
import Masthead from "./masthead";

const ProjectsFullstack = () => {
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
      const projectsFetch = await api.getProjectsByType("fullstack", 1, 20);
      const projects = await projectsFetch.json();
      const userFetch = await api.userAuth();
      const user = await userFetch.json();
      setIsAuthenticated(user.isAuthenticated);
      setProjects(projects.data);
      setHasMore(projects.hasMore);
      setResultsCount(projects.total);
      setIsLoading(false);
      console.log(projects);
    };

    fetch();
  }, []);

  const fetchData = async () => {
    const res = await api.getProjectsByType("fullstack", currentPage + 1, 20);
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
                <ResultsHeader count={resultsCount} name="Full Stack" />
                <ProjectsCard
                  projects={projects}
                  fetchData={fetchData}
                  hasMore={hasMore}
                />
              </div>
            </>
          ) : (
            <div className="noMatch">
              <NotFound
                header="No results found"
                subHeader="We couldn't find any projects. Try another search."
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectsFullstack;
