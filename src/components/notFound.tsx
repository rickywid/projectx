import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import '../styles/noMatch.scss';

interface Props {
    header: string;
    subHeader: string;
    cta?: React.ReactNode;
}

const NotFound = ({ header, subHeader, cta }: Props) => {
    return (
        <div className="noMatch">
            <div className="noMatch-inner">
            <h1>{header}</h1>
            <p>{subHeader}</p>
            {cta && <Link to="/"><Button type="primary">Return to Homepage</Button></Link>}
            </div>
      </div>
    )
}

export default NotFound;