import React, { useEffect, useState } from 'react';
import ProjectsCard from './projectCard';
import ApiService from '../lib/apiService';

const Root: React.FC = () => {
    const api = new ApiService();
    const [projects, setProjects] = useState<any[]>([])

    useEffect(() => {      
        const fetchData = async () => {
            const res = await api.getProjects()
            const json = await res.json();
            
            setProjects(json.data);
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
