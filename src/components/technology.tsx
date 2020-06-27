import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Technology = () => {

  useEffect(() => {
    // fetch Technology from api
  });

  return (
    <div className="technology-wrapper">
        <Link to={`/technology/react`}>React</Link>
    </div>
  );
};

export default Technology;


