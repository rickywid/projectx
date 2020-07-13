import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Divider } from 'antd';
import { ReactComponent as Angular } from '../assets/tech/angular.svg';
import { ReactComponent as AWS } from '../assets/tech/aws.svg';
import { ReactComponent as Azure } from '../assets/tech/azure.svg';
import { ReactComponent as Circleci } from '../assets/tech/circleci.svg';
import { ReactComponent as CSS } from '../assets/tech/css.svg';
import { ReactComponent as Django } from '../assets/tech/django.svg';
import { ReactComponent as Docker } from '../assets/tech/docker.svg';
import { ReactComponent as DotNet } from '../assets/tech/dotnet.svg';
import { ReactComponent as Drupal } from '../assets/tech/drupal.svg';
import { ReactComponent as Electron } from '../assets/tech/electron.svg';
import { ReactComponent as Firebase } from '../assets/tech/firebase.svg';
import { ReactComponent as Flask } from '../assets/tech/flask.svg';
import { ReactComponent as Gatsby } from '../assets/tech/gatsby.svg';
import { ReactComponent as Gitlab } from '../assets/tech/gitlab.svg';
import { ReactComponent as Googlecloud } from '../assets/tech/googlecloud.svg';
import { ReactComponent as GraphQL } from '../assets/tech/graphql.svg';
import { ReactComponent as Heroku } from '../assets/tech/heroku.svg';
import { ReactComponent as HTML } from '../assets/tech/html.svg';
import { ReactComponent as Javascript } from '../assets/tech/javascript.svg';
import { ReactComponent as Jenkins } from '../assets/tech/jenkins.svg';
import { ReactComponent as Jquery } from '../assets/tech/jquery.svg';
import { ReactComponent as Laravel } from '../assets/tech/laravel.svg';
import { ReactComponent as Mongo } from '../assets/tech/mongo.svg';
import { ReactComponent as Mysql } from '../assets/tech/mysql.svg';
import { ReactComponent as Next } from '../assets/tech/next.svg';
import { ReactComponent as Node } from '../assets/tech/node.svg';
import { ReactComponent as Nuxt } from '../assets/tech/nuxt.svg';
import { ReactComponent as Postgresql } from '../assets/tech/postgresql.svg';
import { ReactComponent as Rails } from '../assets/tech/rails.svg';
import { ReactComponent as ReactI } from '../assets/tech/react.svg';
import { ReactComponent as Rethink } from '../assets/tech/rethink.svg';
import { ReactComponent as Spring } from '../assets/tech/spring.svg';
import { ReactComponent as Symfony } from '../assets/tech/symfony.svg';
import { ReactComponent as Travisci } from '../assets/tech/travisci.svg';
import { ReactComponent as Typescript } from '../assets/tech/typescript.svg';
import { ReactComponent as Vue } from '../assets/tech/vue.svg';

import '../styles/technologyList.scss';

const Technology = () => {

  return (
    <div className="technology-wrapper">
      <section className="frontend">
        <h1>Front end</h1>
        <Divider />
        <Row>
          <Col className="pb-20" xs={{ span: 24 }} sm={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/tech/react`}><ReactI /></Link>
          </Col>
          <Col className="pb-20" xs={{ span: 24 }} sm={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/tech/vue`}><Vue /></Link>
          </Col>
          <Col className="pb-20" xs={{ span: 24 }} sm={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/tech/angular`}><Angular /></Link>
          </Col>
          <Col className="pb-20" xs={{ span: 24 }} sm={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/tech/javascript`}><Javascript /></Link>
          </Col>
        </Row>
        <Row>
          <Col className="pb-20" xs={{ span: 24 }} sm={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/tech/html`}><HTML /></Link>
          </Col>
          <Col className="pb-20" xs={{ span: 24 }} sm={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/tech/css`}><CSS /></Link>
          </Col>
          <Col className="pb-20" xs={{ span: 24 }} sm={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/tech/typescript`}><Typescript /></Link>
          </Col>
          <Col className="pb-20" xs={{ span: 24 }} sm={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/tech/jquery`}><Jquery className="lg-svg" /></Link>
          </Col>
        </Row>
      </section>

      <section className="backend">
        <h1>Back end</h1>
        <Divider />
        <Row>
          <Col className="pb-20" xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/tech/django`}><Django className="lg-svg" /></Link>
          </Col>
          <Col className="pb-20" xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/tech/dotnet`}><DotNet /></Link>
          </Col>
          <Col className="pb-20" xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/tech/flask`}><Flask /></Link>
          </Col>
          <Col className="pb-20" xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/tech/graphql`}><GraphQL /></Link>
          </Col>
        </Row>
        <Row>
          <Col className="pb-20" xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/tech/laravel`}><Laravel /></Link>
          </Col>
          <Col className="pb-20" xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/tech/node`}><Node className="lg-svg" /></Link>
          </Col>
          <Col className="pb-20" xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/tech/rails`}><Rails className="lg-svg" /></Link>
          </Col>
          <Col className="pb-20" xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/tech/spring`}><Spring /></Link>
          </Col>
        </Row>
        <Row>
          <Col className="pb-20" xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/tech/symfony`}><Symfony /></Link>
          </Col>
        </Row>
      </section>

      <section className="databases">
        <h1>Databases</h1>
        <Divider />
        <Row>
          <Col className="pb-20" xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/tech/mysql`}><Mysql className="lg-svg" /></Link>
          </Col>
          <Col className="pb-20" xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/tech/rethink`}><Rethink className="lg-svg" /></Link>
          </Col>
          <Col className="pb-20" xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/tech/mongo`}><Mongo className="lg-svg" /></Link>
          </Col>
          <Col className="pb-20" xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/tech/postgresql`}><Postgresql /></Link>
          </Col>
        </Row>

        <Row>
          <Col className="pb-20" xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/tech/firebase`}><Firebase /></Link>
          </Col>
        </Row>
      </section>

      <section className="devops">
        <h1>DevOps</h1>
        <Divider />
        <Row>
          <Col className="pb-20" xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/tech/aws`}><AWS /></Link>
          </Col>
          <Col className="pb-20" xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/tech/azure`}><Azure /></Link>
          </Col>
          <Col className="pb-20" xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/tech/circleci`}><Circleci /></Link>
          </Col>
          <Col className="pb-20" xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/tech/docker`}><Docker /></Link>
          </Col>
        </Row>
        <Row>
          <Col className="pb-20" xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/tech/travisci`}><Travisci /></Link>
          </Col>
          <Col className="pb-20" xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/tech/gitlab`}><Gitlab /></Link>
          </Col>
          <Col className="pb-20" xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/tech/googlecloud`}><Googlecloud /></Link>
          </Col>
          <Col className="pb-20" xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/tech/Jenkins`}><Jenkins /></Link>
          </Col>
        </Row>
        <Row>
          <Col className="pb-20" xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/tech/heroku`}><Heroku /></Link>
          </Col>
        </Row>
      </section>

      <section className="frameworks">
        <h2>Frameworks</h2>
        <Divider />
        <Row>
          <Col className="pb-20" xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/tech/next`}><Next className="lg-svg" /></Link>
          </Col>

          <Col className="pb-20" xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/tech/nuxt`}><Nuxt className="lg-svg" /></Link>
          </Col>
          <Col className="pb-20" xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/tech/gatsby`}><Gatsby className="lg-svg" /></Link>
          </Col>
          <Col className="pb-20" xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/tech/electron`}><Electron className="lg-svg" /></Link>
          </Col>
        </Row>
        <Row>
          <Col className="pb-20" xs={{ span: 24 }} md={{ span: 8 }} lg={{ span: 6 }}>
            <Link to={`/tag/tech/drupal`}><Drupal /></Link>
          </Col>
        </Row>
      </section>
    </div>
  );
};

export default Technology;
