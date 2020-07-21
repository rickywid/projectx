import React from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import { subscriberUrl } from '../lib/const';
import '../styles/footer.scss';

const Footer: React.FC = () => (
  <Layout.Footer style={{ background: 'none' }}>
    <ul>
      <li>
        <Link to={`/guidelines`}>
          Guidelines
        </Link>
      </li>
      <li>
        <Link to={`/feedback`}>
          Feedback
        </Link>
      </li>
      <li>
        <a href={subscriberUrl} target="__blank">Subscribe</a>
      </li>
    </ul>
  </Layout.Footer>
);

export default Footer;
