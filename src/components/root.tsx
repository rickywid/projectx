import React, { useEffect, useState } from "react";
import ProjectsCard from "./projectCard";
import ProjectFilters from "./projectFilters";
import Spinner from "./spinner";
import Masthead from "./masthead";
import ApiService from "../lib/apiService";
import { pageTitle } from "../lib/const";

const Root: React.FC = () => {
  const api = new ApiService();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const userFetch = await api.userAuth();
      const res = await api.getProjects(currentPage, 20);
      const json = await res.json();
      const user = await userFetch.json();

      setIsAuthenticated(user.isAuthenticated);
      setProjects(json.data);
      setIsLoading(false);
      setHasMore(json.hasMore);

      document.title = pageTitle;
    };

    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await api.getProjects(currentPage + 1, 20);
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
        <div className="root">
          {!isAuthenticated ? <Masthead /> : ""}
          <ProjectFilters />
          <ProjectsCard
            projects={projects}
            fetchData={fetchData}
            hasMore={hasMore}
          />
        </div>
      )}
    </div>
  );
};

export default Root;
