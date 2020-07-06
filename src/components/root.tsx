import React, { useEffect, useState } from 'react';
import ProjectsCard from './projectCard';
import Spinner from './spinner';
import ApiService from '../lib/apiService';
import { pageTitle } from '../lib/const';

const Root: React.FC = () => {
    const api = new ApiService();
    const [projects, setProjects] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {      
        const fetchData = async () => {
            const res = await api.getProjects()
            const json = await res.json();
            
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
                <ProjectsCard projects={projects}/>
             </div>
        }
        </div>        
    )
};

export default Root;
