import React, { useEffect, useState } from 'react';
import ProjectsCard from './projectCard';
import ApiService from '../lib/apiService';
import { pageTitle } from '../lib/const';

const Root: React.FC = () => {
    const api = new ApiService();
    const [projects, setProjects] = useState<any[]>([])

    useEffect(() => {      
        const fetchData = async () => {
            const res = await api.getProjects()
            const json = await res.json();
            
            setProjects(json.data);

            document.title = pageTitle;
        }
        
        fetchData();

    }, []);
    
    return (
        
        <div className="root">
          <ProjectsCard projects={projects}/>
        </div>
    
    )
};

export default Root;
