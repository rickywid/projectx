import React from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Spinner = () => {

  return <div style={{textAlign: 'center'}}><Spin indicator={antIcon} /></div>;
};

export default Spinner;


