import React, { useState, useEffect } from 'react';
import ApiService from '../lib/apiService';
import { Link } from 'react-router-dom';
import { CodeOutlined, HeartFilled, DesktopOutlined, TagFilled, CalendarFilled, TeamOutlined } from '@ant-design/icons';
import { Form, Input, Button, Divider } from 'antd';
import moment from 'moment';
import history from '../lib/history';

const { TextArea } = Input;

interface IProjectPage {
    children?: React.ReactNode;
    project?: {
        id: string;
        name: string;
        owner: string;
        images: string;
        url: {
            id: number;
            user_id: number;
            comment: string;
            project_id: number;
            created_on: string;
        }[];
    };
    comments?: any[];
    userID?: string | null;
    username?: string;
    likes?: any[];
}

interface IFields {
    comment: {created_on: string};
}

const Project = () => {
    const userID = localStorage.getItem('userID');

    useEffect(() => {
        const api = new ApiService();
        const id = window.location.pathname.split('/')[2];

        const fetch = async () => {
            setIsLoading(true);
            const project = await api.getProject(id);

            if (project.status === 200) {
                const data = await project.json();
                
                setProject(data.project);
                setC(data.comments);
                setLikeCount(data.likes.count);
                setisLiked(data.likes.users.includes(parseInt(userID as string)))
                setIsLoading(false);
            }
        }

        fetch();

    }, []);

    const [project, setProject] = useState<any>({});
    const [c, setC] = useState<any>([]);
    const [isLiked, setisLiked] = useState<boolean>(false);
    const [likeCount, setLikeCount] = useState<string>('0');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const api = new ApiService();

    const handleLike = async (like?: boolean) => {
        const user = userID as string;
        const id = window.location.pathname.split('/')[2];
        const form = new FormData();
        let data;

        form.append('project_id', project.id);
        form.append('user_id', user);

        if(!user) {
            history.push('/login');
            return;
        }
        if(like) {
            const res = await api.likeProject(id, form);
            data = await res.json();
        } else {
            const res = await api.unlikeProject(id, form);
            data = await res.json();
        }
        setisLiked(data.data.users.includes(parseInt(user)));
        setLikeCount(data.data.count);
    }

    const onFinish = async (values: IFields) => {

        const { comment } = values;
        const form = new FormData();
        form.append('comment', JSON.stringify(comment));
        form.append('project_id', project.id);
        form.append('user_id', userID as string);

        const res = await api.createComment(form);

        if(res.status === 200) {
          // do somethings
          setC([...c, {comment: comment, username: userID, created_on: comment.created_on}])
        }
    }

    return (
        <div className="project-view">

            {isLoading ? <p>loading</p> :
                <>
                    <div className="project-view-title">
                        <div className="project-view-title-info">
                            <h2>{project.name}</h2>
                            <p>by <Link to={`/user/${project.username}`}><a>{project.username}</a></Link></p>
                        </div>
                        <div className="button-wrap">
                            {isLiked ? <Button onClick={() => handleLike()} icon={<HeartFilled />}>Liked</Button> : <Button onClick={() => handleLike(true)} icon={<HeartFilled />}>Like</Button>}

                            <Button>Save</Button>
                        </div>

                    </div>
                    <img style={{ width: '800px' }} className="project-view-screenshot" src={project.images[0]} alt="screenshot" />
                    <Divider />
                    <div className="project-view-content">
                        <div className="project-view-left-col">
                            <p>{project.description}</p>

                            {userID ?
                                <>
                                    <Form
                                        layout="vertical"
                                        onFinish={onFinish as any}
                                    >
                                        <Form.Item
                                            name="comment"
                                            rules={[{ required: true, message: 'Required' }]}
                                        >
                                            <TextArea rows={2} />
                                        </Form.Item>
                                        <Button type="primary" htmlType="submit">Send</Button>
                                    </Form>
                                    <Divider />
                                </>
                                : <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Please <Link to={`/login`}>Log In</Link> to write a comment</p>}

                            <div className="project-view-comments">
                            <h3>{c.length} comments</h3>
                                {c?.map((c: any) => (
                                    <div className="project-view-comment">
                                        <div className="project-view-comment-top-wrapper">
                                            <img style={{width: '25px'}} src="https://illlustrations.co/static/34b8b771e91097048a9494b382ec2fc2/118-macbook.png" alt={`${project.username}'s profile`} />
                                            <span className="project-view-comment-user">{c.username}</span>
                                        </div>
                                        <div className="project-view-comment-body">
                                            <p>{c.comment}</p>
                                            <small>{moment(c.created_on).fromNow()}</small>
                                        </div>
                                        <Divider />
                                    </div>
                                ))}
                            </div>

                        </div>
                        <div className="project-view-right-col">
                            <a href={project.url}><Button className="website" icon={<DesktopOutlined />} type="primary">Website</Button></a>
                            <a href={project.url}><Button className="repo" icon={<CodeOutlined />} type="primary">Repository</Button></a>
                            <Divider />
                            <div className="project-view-tags">
                                <TagFilled />
                                <ul>{project.technologies.map((tag: string) => <li style={{ listStyle: 'none' }}>{tag}</li>)}</ul>
                            </div>
                            <Divider />
                            <div className="project-view-details">
                                <ul>
                                    <li><HeartFilled /> {likeCount} likes</li>
                                    <li><TeamOutlined /> Interested in collaborating</li>
                                    <li><CalendarFilled /> Created June 4, 2020</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default Project;