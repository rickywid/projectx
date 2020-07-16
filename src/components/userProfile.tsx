import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, Button } from 'antd';
import ApiService from '../lib/apiService';
import { siteName } from '../lib/const';
import ProjectsCard from '../components/projectCard';
import Spinner from './spinner';
import '../styles/userProfile.scss';
import { ReactComponent as CodeSVG } from '../assets/code.svg';

const { TabPane } = Tabs;


interface IUserProfile {
    children?: React.ReactNode;
    match: any;
}

const UserProfile = ({ match }: IUserProfile) => {
    const api = new ApiService();
    const username = match.params.username;
    const [user, setUser] = useState<any>({});
    const [userProjects, setUserProjects] = useState([]);
    const [likedProjects, setLikedProjects] = useState([]);
    const [savedProjects, setSavedProjects] = useState([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetch = async () => {
            const user = await api.getUserProfile(username);
            const json = await user.json();

            setUser(json.data.user);
            setUserProjects(json.data.userProjects);
            setLikedProjects(json.data.likedProjects);
            setSavedProjects(json.data.savedProjects);
            setIsLoading(false);

            document.title = `${json.data.user.username}'s Profile - ${siteName}`;
        }

        fetch();
    }, [])

    const callback = (key: string) => {
        console.log(key);
    }

    return (
        <div>
            {isLoading ? <Spinner /> :
                <div className="user-profile-wrapper">
                    <img className="user-avatar" src={user.gh_avatar} alt="" />
                    <div className="user-profile-detail">
                        <h1 className="user-name">{user.username}</h1>
                        <p>{user.description}</p>
                        {localStorage.getItem('username') === username ?
                            <Link to={`/user/edit/${user.username}`}>
                                <Button size="small" type="dashed">edit</Button>
                            </Link> :
                            ""
                        }
                    </div>
                    <Tabs className="user-tabs" defaultActiveKey="1" onChange={callback}>
                        <TabPane tab={<span><strong>My Projects </strong><span style={{ color: 'grey' }}>{userProjects.length}</span></span>} key="1">
                            {userProjects.length ?
                                <ProjectsCard isOwner={user.selfProfile} projects={userProjects} /> : (
                                    <div className="user-msg-no-projects">
                                        <CodeSVG style={{ width: 150, marginBottom: 20, fill: '#b3b3b3' }} />
                                        <p>You haven't uploaded any projects yet.</p>
                                        <Link to="/upload">
                                            <Button type="primary">Upload your first project</Button>
                                        </Link>
                                    </div>
                                )
                            }
                        </TabPane>
                        <TabPane tab={<span><strong> Liked Projects </strong><span style={{ color: 'grey' }}>{likedProjects.length}</span></span>} key="2">
                            <ProjectsCard projects={likedProjects} />
                        </TabPane>
                        <TabPane tab={<span><strong> Saved Projects </strong><span style={{ color: 'grey' }}>{savedProjects.length}</span></span>} key="3">
                            <ProjectsCard projects={savedProjects} />
                        </TabPane>
                    </Tabs>
                </div>
            }
        </div>
    )
}

export default UserProfile;