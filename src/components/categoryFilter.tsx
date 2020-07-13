import React, { useEffect, useState } from 'react';
import ProjectsCard from './projectCard';
import ApiService from '../lib/apiService';
import { tags } from '../lib/const';

interface ITechnologyFilter {
    children?: React.ReactNode;
    match: any;
}

const TechnologyFilter = ({ match }: ITechnologyFilter) => {
    const api = new ApiService();
    const params = match.params.category;
    let value: string;

    const [projects, setProjects] = useState<[]>([]);

    useEffect(() => {
        for(let key in tags) {
            if(tags[key].slug === params) {
                value = key;
            }
        }

        const fetch = async () => {
            const res = await api.filterCategory(value);
            const projects = await res.json();
            
            setProjects(projects.data);
        }

        fetch();
        
    }, []);

  return (
    <div className="tags-wrapper">
        <ProjectsCard projects={projects}/>
    </div>
  );
};

export default TechnologyFilter;


