import React from 'react';

interface Props {
    count: number;
    name: string | null;
}

const ResultsHeader = ({count, name}: Props) => {
    
    return (
        <p>
            <strong>{count} {count > 1 ? 'results' : 'result'} found for "{name}"</strong></p>
    )
}

export default ResultsHeader;