import React, { useEffect, useState } from "react";
import ProjectFilters from "./projectFilters";
import ProjectsCard from "./projectCard";
import ResultsHeader from "./resultsHeader";
import Spinner from "./spinner";
import NotFound from "./notFound";
import ApiService from "../lib/apiService";
import { technologies } from "../lib/const";
import "../styles/noMatch.scss";
import Masthead from "./masthead";

interface ITechnologyFilter {
  children?: React.ReactNode;
  match: any;
}

const TechnologyFilter = ({ match }: ITechnologyFilter) => {
  const api = new ApiService();
  const params = match.params.technology;
  const [projects, setProjects] = useState<any>([]);
  const [resultsCount, setResultsCount] = useState<number>(0);
  const [loading, isLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  let value: string;
  for (let key in technologies) {
    if (technologies[key].slug === params) {
      value = key;
    }
  }

  useEffect(() => {
    const fetch = async () => {
      const res = await api.filterTechnology(value, 1, 20);
      const projects = await res.json();
      const userFetch = await api.userAuth();
      const user = await userFetch.json();
      setIsAuthenticated(user.isAuthenticated);
      setProjects(projects.data);
      setHasMore(projects.hasMore);
      setResultsCount(projects.total);
      isLoading(false);
    };

    fetch();
  }, []);

  const fetchData = async () => {
    const res = await api.filterTechnology(value, currentPage + 1, 20);
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
          <ProjectFilters />
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
