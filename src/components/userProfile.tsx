import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, Button } from 'antd';
import ApiService from '../lib/apiService';
import ProjectsCard from '../components/projectCard';

const { TabPane } = Tabs;


interface IUserProfile {
    children?: React.ReactNode;
    match: any;
  }

const UserProfile = ({match}: IUserProfile) => {
    const api = new ApiService();
    
    const [user, setUser] = useState<any>({});
    const [userProjects, setUserProjects] = useState([]);
    const [likedProjects, setLikedProjects] = useState([]);
    const [savedProjects, setSavedProjects] = useState([]);
    
    useEffect(() => {
        const fetch = async () => {
            const username = match.params.username;
            const user = await api.getUserProfile(username);
            const json = await user.json();
            
            setUser(json.data.user);
            setUserProjects(json.data.userProjects);
            setLikedProjects(json.data.likedProjects);
            setSavedProjects(json.data.savedProjects);
        }

        fetch();
    }, [])

    const callback = (key: string) => {
        console.log(key);
    }

    return (
        <div>
            <img style={{height: '100px', borderRadius: '100%'}} src={user.gh_avatar} alt=""/>
            <span>{user.username}</span>
            <Link 
                to={`/user/edit/${user.id}`}><Button size="small" type="dashed">edit</Button></Link>
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab={<span> My Projects <span style={{color: 'grey'}}>{userProjects.length}</span></span>} key="1">
                My Projects
                <ProjectsCard isOwner={user.selfProfile} projects={userProjects}/>
                Edit Delete
                </TabPane>
                <TabPane tab={<span> Liked Projects <span style={{color: 'grey'}}>{likedProjects.length}</span></span>} key="2">
                Liked Projects
                <ProjectsCard projects={likedProjects}/>
                </TabPane>
                <TabPane tab={<span> Saved Projects <span style={{color: 'grey'}}>{savedProjects.length}</span></span>} key="3">
                Saved Projects
                <ProjectsCard projects={savedProjects}/>
                </TabPane>
            </Tabs>
        </div>
    )
}

export default UserProfile;