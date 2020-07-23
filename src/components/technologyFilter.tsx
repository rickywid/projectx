import React, { useEffect, useState } from 'react';
import ProjectFilters from './projectFilters';
import ProjectsCard from './projectCard';
import ResultsHeader from './resultsHeader';
import Spinner from './spinner';
import NotFound from './notFound';
import ApiService from '../lib/apiService';
import { technologies } from '../lib/const';
import '../styles/noMatch.scss';

interface ITechnologyFilter {
    children?: React.ReactNode;
    match: any;
}

const TechnologyFilter = ({ match }: ITechnologyFilter) => {
    const api = new ApiService();
    const params = match.params.technology;
    let value: string;

    const [projects, setProjects] = useState<[]>([]);
    const [resultsCount, setResultsCount] = useState<number>(0);
    const [loading, isLoading] = useState<boolean>(true);

    useEffect(() => {
        for (let key in technologies) {
            if (technologies[key].slug === params) {
                value = key;
            }
        }

        const fetch = async () => {
            const res = await api.filterTechnology(value);
            const projects = await res.json();

            setProjects(projects.data);
            setResultsCount(projects.data.length);
            isLoading(false);
        }

        fetch();

    }, []);

    return (
        <div>
            {loading ? <Spinner /> :
                <div>
                    <ProjectFilters />
                    {projects.length >= 1 ? (
                        <>
                            <div className="tags-wrapper">
                                <ResultsHeader count={resultsCount} name={params} />
                                <ProjectsCard projects={projects} />
                            </div>
                        </>
                    ) : (
                        <NotFound 
                            header="No results found"
                            subHeader="We couldn't find any projects. Try another search."
                        />
                        )}
                </div>
            }
        </div>
    );
};

export default TechnologyFilter;
