import React, { useState, useEffect } from 'react';
import ApiService from '../lib/apiService';
import { Link } from 'react-router-dom';
import { CodeOutlined, HeartFilled, HeartTwoTone, HeartOutlined, DesktopOutlined, TagFilled, CalendarFilled, TeamOutlined, FlagFilled } from '@ant-design/icons';
import { Radio, Modal, Form, Input, Button, Divider, message } from 'antd';
import { TwitterShareButton, TwitterIcon, FacebookShareButton, FacebookIcon } from 'react-share';
import moment from 'moment';
import history from '../lib/history';
import '../styles/project.scss'

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
    const api = new ApiService();
    const id = window.location.pathname.split('/')[2];

    useEffect(() => {
        
        const userID = localStorage.getItem('userID');

        const fetch = async () => {
            setIsLoading(true);
            const project = await api.getProject(id);
            const user = await api.getUser(userID as string);
            const saved = await api.isProjectSaved(id);

            if (project.status === 200) {
                const data = await project.json();
                const data2 = await user.json();
                const data3 = await saved.json();
                
                setisSaved(data3.data);
                setUser(data2.data);
                setProject(data.project);
                setC(data.comments);
                setLikeCount(data.likes.count);
                setisLiked(data.likes.users.includes(parseInt(userID as string)))
                setIsLoading(false);

                document.title = data.project.name;
            }
        }

        fetch();

    }, []);

    const [user, setUser] = useState<any>({});
    const [project, setProject] = useState<any>({});
    const [c, setC] = useState<any>([]);
    const [isSaved, setisSaved] = useState<boolean>(false);
    const [isLiked, setisLiked] = useState<boolean>(false);
    const [likeCount, setLikeCount] = useState<string>('0');
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [visible, setVisible] = useState<boolean>(false);
    const [value, setValue] = useState<string>('1');

    const handleLike = async (like?: boolean) => {
        
        const id = window.location.pathname.split('/')[2];
        const form = new FormData();
        let data;

        form.append('project_id', project.id);
        form.append('user_id', user.id);

        if(!user.isAuthenticated) {
            message.info('You must be logged in');
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

        setisLiked(data.data.users.includes(parseInt(localStorage.getItem('userID') as string)));
        setLikeCount(data.data.count);
    }

    const submitComment = async (values: IFields) => {

        const { comment } = values;
        const form = new FormData();
        form.append('comment', comment.toString());
        form.append('project_id', project.id);
        form.append('user_id', user.id);
        
        const res = await api.createComment(form);
        
        if(res.status === 200) {
          // do somethings
          setC([...c, {comment: comment, username: user.username, gh_avatar: user.gh_avatar, created_on: comment.created_on}])
        }
    }

    const handleSaveProject = async (saved: boolean) => {

        const id = window.location.pathname.split('/')[2];
        const form = new FormData();
        let data;

        form.append('project_id', project.id);
        form.append('user_id', user.id);
        
        if(!user.isAuthenticated) {

            history.push('/login');
            return;
        }
        if(saved) {
            const res = await api.saveProject(id, form);
            data = await res.json();
        } else {
            const res = await api.unSaveProject(id, form);
            data = await res.json();
        }

        setisSaved(data.data);
        
    }

    const onChange = (e: any) => setValue(e.target.value);

    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    };

    const showModal = () => setVisible(true);
    const handleOk = async () => {
        const form = new FormData();

        form.append('project_id', id);
        form.append('comment', value);
        await api.reportProject(form);
        message.success('Project has been reported');
        setVisible(false);
    }
    const handleCancel = () => setVisible(false);

    const copyUrl = () => {
        navigator.clipboard.writeText(document.location.href)
        .then(() => {
          message.info('Copied');
        })
        .catch(err => {
          // This can happen if the user denies clipboard permissions:
          console.error('Could not copy text: ', err);
        });
    }

    return (
        <div className="project-view">

            {isLoading ? <p>loading</p> :
                <>
                    <div className="project-view-title">
                        <div className="project-view-title-info">
                            <h2>{project.name}</h2>
                            <p>by <Link className="project-owner" to={`/user/${project.username}`}><img style={{height: '20px', borderRadius: '100%'}} src={project.gh_avatar} alt="avatar"/> {project.username}</Link></p>
                        </div>
                        <div className="button-wrap">
                            {isLiked ? <Button onClick={() => handleLike(false)} icon={<HeartTwoTone twoToneColor="#eb2f96" />}>Liked</Button> : <Button onClick={() => handleLike(true)} icon={<HeartOutlined />}>Like</Button>}
                            {isSaved ? <Button onClick={() => handleSaveProject(false)}>Saved</Button> :<Button onClick={() => handleSaveProject(true)}>Save</Button>}
                        </div>

                    </div>
                    <img className="project-view-screenshot" src={project.images[0]} alt="screenshot" />
                    <div  className="project-share-wrapper">
                        <FacebookShareButton url={process.env.REACT_APP_HOSTNAME as string}>
                            <FacebookIcon size={32} />
                        </FacebookShareButton>
                        <TwitterShareButton url={process.env.REACT_APP_HOSTNAME as string} title={project.name}>
                            <TwitterIcon size={32} />
                        </TwitterShareButton>
                        <Button onClick={copyUrl}>Copy Url</Button>
                    </div>
                    <Divider />
                    <div className="project-view-content">
                        <div className="project-view-left-col">
                            <p>{project.tagline}</p>
                            <p>{project.description}</p>

                            {user.isAuthenticated ?
                                <>
                                    <Form
                                        layout="vertical"
                                        onFinish={submitComment as any}
                                    >
                                        <Form.Item
                                            name="comment"
                                            rules={[{ required: true, message: 'Required' }]}
                                        >
                                            <TextArea placeholder="What do you think of this project?" rows={2} />
                                        </Form.Item>
                                        <Button className="comment-btn" type="primary" htmlType="submit">Send</Button>
                                    </Form>
                                    <Divider />
                                </>
                                : <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Please <Link to={`/login`}>Log In</Link> to write a comment</p>}

                            <div className="project-view-comments">
                            <h3>{c.length} comments</h3>
                                {c?.map((c: any) => (
                                    <div className="project-view-comment">
                                        <div className="project-view-comment-top-wrapper">
                                            <img style={{width: '25px'}} src={c.gh_avatar} alt={`${c.username}'s profile`} />
                                            <Link to={`/user/${c.username}`} className="project-view-comment-user">{c.username}</Link>
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
                            <a href={project.url}><Button className="website-btn" icon={<DesktopOutlined />} type="primary">Website</Button></a>
                            {project.repo ?<a href={project.repo}><Button className="repo-btn" icon={<CodeOutlined />} type="primary">Repository</Button></a> : '' }
                            <Divider />
                            <div className="project-view-tags">
                                <TagFilled />
                                <ul>{project.technologies.map((technology: string) => <Link to={`/technology/${technology}`}><li style={{ listStyle: 'none' }}>{technology}</li></Link>)}</ul>
                            </div>
                            <Divider />
                            <div className="project-view-details">
                                <ul>
                                    <li><HeartFilled /> {likeCount} likes</li>
                                    {project.collaboration && <li><TeamOutlined /> Looking for contributors</li>}
                                    <li><CalendarFilled /> Created June 4, 2020</li>
                                    <li><FlagFilled /> <button style={{background: 'none', border: 'none', padding: 0}} onClick={showModal}>Report</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </>
            }
            <Modal
                title="Report Project"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="Submit"
                >
                <Radio.Group onChange={onChange} value={value}>
                    <Radio style={radioStyle} value={'1'}>
                        This is offensive or inappropriate content.
                    </Radio>
                    <Radio style={radioStyle} value={'2'}>
                        This is sexual or suggestive content.
                    </Radio>
                    <Radio style={radioStyle} value={'3'}>
                        This is illegal content.
                    </Radio>
                    <Radio style={radioStyle} value={'4'}>
                        This is spam.
                    </Radio>
                </Radio.Group>
            </Modal>
        </div>
    )
}

export default Project;