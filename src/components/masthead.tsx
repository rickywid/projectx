import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import '../styles/masthead.scss';
import '../styles/global.scss';
import mastheadImg from '../assets/macbook.jpeg';

const Masthead = () => {
    return (
        <div className="masthead full-width">
            <div className="masthead-inner">
                <div className="masthead-text">
                    <h1>Discover projects built by developers.</h1>
                    <p>CodeConcept is a place to find and showcase project concepts and prototypes built by the dev community.</p>
                    <Link to="/signup">
                        <Button type="primary">Sign Up</Button>
                    </Link>
                </div>
                <figure>
                    <img src={mastheadImg} alt=""/>
                </figure>
            </div>
        </div>
    )
}

export default Masthead;