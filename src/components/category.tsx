import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Divider } from 'antd';
import { ReactComponent as Analytics } from '../assets/category/analytics.svg';
import { ReactComponent as Design } from '../assets/category/design.svg';
import { ReactComponent as Ecommerce } from '../assets/category/ecommerce.svg';
import { ReactComponent as Finance } from '../assets/category/finance.svg';
import { ReactComponent as Framework } from '../assets/category/framework.svg';
import { ReactComponent as Gaming } from '../assets/category/gaming.svg';
import { ReactComponent as Music } from '../assets/category/music.svg';
import { ReactComponent as Personal } from '../assets/category/personal.svg';
import { ReactComponent as Productivity } from '../assets/category/productivity.svg';
import { ReactComponent as Realtime } from '../assets/category/realtime.svg';
import { ReactComponent as Sports } from '../assets/category/sports.svg';
import { ReactComponent as Travel } from '../assets/category/travel.svg';
import { ReactComponent as Ui } from '../assets/category/ui.svg';
import { ReactComponent as Uncategorized } from '../assets/category/uncategorized.svg';
import { ReactComponent as Visualization } from '../assets/category/visualization.svg';
import { siteName } from '../lib/const';

import '../styles/technologyList.scss';

const Category = () => {

  useEffect(() => {
    document.title = `${siteName} - Categories`;  
  });
  
  return (
    <div className="technology-wrapper">
      <section className="categories">
        <h1>Categories</h1>
        <Divider />
        <Row>
          <Col className="pb-20" xs={{ span: 12 }} sm={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/category/analytics`}>
                <Analytics />
                <p>Analytics</p>
            </Link>
          </Col>
          <Col className="pb-20" xs={{ span: 12 }} sm={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/category/art-design`}>
                <Design />
                <p>Art/Design</p>    
            </Link>
          </Col>
          <Col className="pb-20" xs={{ span: 12 }} sm={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/category/ecommerce`}>
                <Ecommerce />
                <p>E-Commerce</p>
                </Link>
          </Col>
          <Col className="pb-20" xs={{ span: 12 }} sm={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/category/finance`}>
                <Finance />
                <p>Finance</p>
            </Link>
          </Col>

        
          <Col className="pb-20" xs={{ span: 12 }} sm={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/category/framework`}>
                <Framework />
                <p>Framework</p>
            </Link>
          </Col>
          <Col className="pb-20" xs={{ span: 12 }} sm={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/category/gaming`}>
                <Gaming />
                <p>Gaming</p>
            </Link>
          </Col>
          <Col className="pb-20" xs={{ span: 12 }} sm={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/category/music`}>
                <Music />
                <p>Music</p>
            </Link>
          </Col>
          <Col className="pb-20" xs={{ span: 12 }} sm={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/category/personal`}>
                <Personal />
                <p>Personal</p>
            </Link>
          </Col>
        
        
          <Col className="pb-20" xs={{ span: 12 }} sm={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/category/productivity`}>
                <Productivity />
                <p>Productivity</p>
            </Link>
          </Col>
          <Col className="pb-20" xs={{ span: 12 }} sm={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/category/real-time`}>
                <Realtime />
                <p>Real Time</p>
            </Link>
          </Col>
          <Col className="pb-20" xs={{ span: 12 }} sm={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/category/sports`}>
                <Sports />
                <p>Sports</p>
            </Link>
          </Col>
          <Col className="pb-20" xs={{ span: 12 }} sm={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/category/travel`}>
                <Travel />
                <p>Travel</p>
            </Link>
          </Col>
        
          <Col className="pb-20" xs={{ span: 12 }} sm={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/category/ui-ux`}>
                <Ui />
                <p>UI/UX</p>
            </Link>
          </Col>
          <Col className="pb-20" xs={{ span: 12 }} sm={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/category/visualization`}>
                <Visualization />
                <p>Visualization</p>
            </Link>
          </Col>
          <Col className="pb-20" xs={{ span: 12 }} sm={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/category/uncategorized`}>
                <Uncategorized />
                <p>Uncategorized</p>
            </Link>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default Category;
