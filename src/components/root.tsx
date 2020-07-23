import React, { useEffect, useState } from 'react';
import ProjectsCard from './projectCard';
import ProjectFilters from './projectFilters';
import Spinner from './spinner';
import Masthead from './masthead';
import ApiService from '../lib/apiService';
import { pageTitle } from '../lib/const';

const Root: React.FC = () => {
    const api = new ApiService();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [projects, setProjects] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {      
        const fetchData = async () => {
            const userFetch = await api.userAuth();
            const res = await api.getProjects()
            const json = await res.json();
            const user = await userFetch.json();
            setIsAuthenticated(user.isAuthenticated);
            setProjects(json.data);
            setIsLoading(false);

            document.title = pageTitle;
        }
        
        fetchData();

    }, []);
    return (
        <div>
        {isLoading ? <Spinner /> : 
            <div className="root">
                {!isAuthenticated ? <Masthead /> : ""}
                <ProjectFilters />
                <ProjectsCard projects={projects}/>
             </div>
        }
        </div>        
    )
};

export default Root;
