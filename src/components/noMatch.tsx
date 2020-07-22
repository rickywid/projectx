import React from 'react';
import { Layout } from 'antd';
import NotFound from './notFound';

const NoMatch: React.FC = () => {

 return (
  <Layout>
    <NotFound 
      header="404!"
      subHeader="The page you are looking for does not exist."
      cta="Return to Homepage"
    />
  </Layout>
 )
};

export default NoMatch;
