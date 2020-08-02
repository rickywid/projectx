import React, { useEffect, useState } from "react";
import ProjectFilter from "./projectFilters";
import ProjectsCard from "./projectCard";
import ResultsHeader from "./resultsHeader";
import NotFound from "./notFound";
import Spinner from "./spinner";
import Masthead from "./masthead";
import ApiService from "../lib/apiService";
import { tags } from "../lib/const";

interface ITechnologyFilter {
  children?: React.ReactNode;
  match: any;
}

const TechnologyFilter = ({ match }: ITechnologyFilter) => {
  const api = new ApiService();
  const params = match.params.category;
  const [projects, setProjects] = useState<any>([]);
  const [resultsCount, setResultsCount] = useState<number>(0);
  const [loading, isLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);

  let value: string;
  for (let key in tags) {
    if (tags[key].slug === params) {
      value = key;
    }
  }

  useEffect(() => {
    const fetch = async () => {
      const res = await api.filterCategory(value, 1, 20);
      const projects = await res.json();
      const userFetch = await api.userAuth();
      const user = await userFetch.json();

      setIsAuthenticated(user.isAuthenticated);
      setProjects(projects.data);
      setResultsCount(projects.total);
      setHasMore(projects.hasMore);
      isLoading(false);
    };

    fetch();
  }, []);

  const fetchData = async () => {
    const res = await api.filterCategory(value, currentPage + 1, 20);
    const json = await res.json();

    setCurrentPage(currentPage + 1);
    setHasMore(json.hasMore);
    setProjects(projects.concat(json.data));
  };

  return (
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          {!isAuthenticated ? <Masthead /> : ""}
          <ProjectFilter />
          {projects.length >= 1 ? (
            <>
              <div className="tags-wrapper">
                <ResultsHeader count={resultsCount} name={params} />
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

export default TechnologyFilter;
