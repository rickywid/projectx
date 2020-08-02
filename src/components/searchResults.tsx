import React, { useEffect, useState } from "react";
import Spinner from "./spinner";
import ProjectsCard from "./projectCard";
import ResultsHeader from "./resultsHeader";
import ApiService from "../lib/apiService";
import Masthead from "./masthead";
import ProjectFilters from "./projectFilters";
import NotFound from "./notFound";

const SearchResults: React.FC = () => {
  const api = new ApiService();
  const params = new URLSearchParams(document.location.search.substring(1));
  const query = params.get("q");
  const [projects, setProjects] = useState<any[]>([]);
  const [resultsCount, setResultsCount] = useState<number>(0);
  const [loading, isLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.search(query as string, 1, 20);
      const json = await res.json();
      const userFetch = await api.userAuth();
      const user = await userFetch.json();
      setIsAuthenticated(user.isAuthenticated);
      setProjects(json.data);
      setResultsCount(json.count);
      setHasMore(json.hasMore);
      isLoading(false);
    };

    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await api.search(query as string, currentPage + 1, 20);
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
        <>
          {!isAuthenticated ? <Masthead /> : ""}
          <ProjectFilters />
          {projects.length > 0 ? (
            <>
              <ResultsHeader count={resultsCount} name={query} />
              <ProjectsCard
                projects={projects}
                fetchData={fetchData}
                hasMore={hasMore}
              />
            </>
          ) : (
            <NotFound
              header="No results found"
              subHeader="We couldn't find any projects. Try another search."
            />
          )}
        </>
      )}
    </div>
  );
};

export default SearchResults;
