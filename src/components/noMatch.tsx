import React from 'react';
import { Link } from 'react-router-dom';
import { Layout, Button } from 'antd';
import '../styles/noMatch.scss';

const NoMatch: React.FC = () => {

 return (
  <Layout>
    <div className="noMatch">
      <div className="noMatch-inner">
        <h1 className="error">404</h1>
        <h2>The page you are looking for does not exist.</h2>
        <Link to="/"><Button type="primary">Return to Homepage</Button></Link>
      </div>
    </div>
    

  </Layout>
 )
};

export default NoMatch;
