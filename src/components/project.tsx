import React, { useState, useEffect } from 'react';
import ApiService from '../lib/apiService';
import { Link } from 'react-router-dom';
import { CodeOutlined, DesktopOutlined, TagFilled, TagsFilled, CalendarFilled, CheckCircleFilled, FlagFilled, BlockOutlined, StarFilled, StarTwoTone, FireTwoTone, FireFilled, EllipsisOutlined } from '@ant-design/icons';
import { Radio, Modal, Form, Input, Button, Divider, message } from 'antd';
import { TwitterShareButton, TwitterIcon, FacebookShareButton, FacebookIcon } from 'react-share';
import Spinner from './spinner';
import Comment from './comment';
import moment from 'moment';
import history from '../lib/history';
import '../styles/global.scss'
import '../styles/project.scss'
import ParseDom from '../lib/domParser';

const { TextArea } = Input;

interface IFields {
    comment: {created_on: string};
}


const Project = () => {
    const api = new ApiService();
    const id = window.location.pathname.split('/')[2];
    const userID = localStorage.getItem('userID');

    useEffect(() => {
        
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
                
                document.title = `${data.project.name} - ${data.project.tagline}`;
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
    const [isCommentSubmitting, setIsCommentSubmitting] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false);
    const [value, setValue] = useState<string>('1');

    const [form] = Form.useForm();

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
        const formComment = new FormData();
        setIsCommentSubmitting(true);
        
        formComment.append('comment', ParseDom(comment.toString()));
        formComment.append('project_id', project.uuid);
        formComment.append('user_id', user.id);
        
        const res = await api.createComment(formComment);
        const data = await res.json();
        
        if(res.status === 200) {
          // do somethings
          setC([...c, {comment_id: data.comment.comment_id, comment: ParseDom(comment.toString()), user_id: data.comment.user_id, username: user.username, gh_avatar: user.gh_avatar}]);
          
          setIsCommentSubmitting(false);
          form.resetFields();
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
            message.info('You must be logged in');

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

    const showReportProjectModal = () => setVisible(true);
    const handleCancel = () => setVisible(false);
    
    const handleReportProject = async () => {
        const form = new FormData();
        form.append('project_id', id);
        form.append('comment', value);
        await api.reportProject(form);
        message.success('Project has been reported');
        setVisible(false);
    }

    const copyUrl = () => {
        navigator.clipboard.writeText(document.location.href)
        .then(() => {
          message.info('Url has been copied');
        })
        .catch(err => {
          // This can happen if the user denies clipboard permissions:
          console.error('Could not copy text: ', err);
        });
    }

    const handleUpdateComment = async (values: any, commentID: number) => {
        
        const form = new FormData();
        form.append('comment_id', commentID!.toString());
        form.append('comment', values.updateComment);
        form.append('project_id', id);
        const res = await api.updateComment(commentID, form);
        const comments = await res.json();

        setC([...comments.data])
    }

    const handleDeleteComment = async (commentID: number) => {
        const form = new FormData();
        form.append('comment_id', commentID!.toString());
        form.append('project_id', id);
        await api.deleteComment(commentID, form);

        const res = await api.updateComment(commentID, form);
        const comments = await res.json();

        setC([...comments.data]);
    }

    return (
        <div className="project-view">

            {isLoading ? <Spinner /> :
                <>
                    <div className="project-view-title">
                        <div className="project-view-title-info">
                            <h2>{project.name}</h2>
                            <p>by <Link className="project-owner" to={`/user/${project.username}`}><img style={{height: '20px', borderRadius: '100%', margin: '0 3px'}} src={project.gh_avatar} alt="avatar"/> {project.username}</Link></p>
                        </div>
                        <div className="button-wrap">
                            {isLiked ? <Button onClick={() => handleLike(false)} icon={<FireTwoTone twoToneColor="#f00" />}><strong style={{marginLeft: '7px'}}>Hot</strong></Button> : <Button onClick={() => handleLike(true)} icon={<FireFilled />}><strong style={{marginLeft: '7px'}}>Hot</strong></Button>}
                            {isSaved ? <Button onClick={() => handleSaveProject(false)} icon={<StarTwoTone twoToneColor="#dea703" />}><strong style={{marginLeft: '7px'}}>Saved</strong></Button> :<Button onClick={() => handleSaveProject(true)} icon={<StarFilled />}><strong style={{marginLeft: '7px'}}>Save</strong></Button>}
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
                        <Button className="btn-copy" icon={<BlockOutlined />} onClick={copyUrl}><strong>Copy</strong></Button>
                    </div>
                    <Divider />
                    <div className="project-view-content">
                        <div className="project-view-left-col">
                            <p className="project-tagline">{project.tagline}</p>
                            <p className="project-description" dangerouslySetInnerHTML={{__html: `${project.description}`}}></p>
                            <Divider />
                            {user.isAuthenticated ?
                                <>
                                    <p><strong>Comment</strong></p>
                                    <Form
                                        form={form}
                                        layout="vertical"
                                        onFinish={submitComment as any}
                                    >
                                        <Form.Item
                                            name="comment"
                                            rules={[{ required: true, message: 'Required' }]}
                                        >
                                            <TextArea placeholder="What do you think of this project?" rows={2} />
                                        </Form.Item>
                                        <div>{isCommentSubmitting ? <Button type="primary" disabled>Send</Button> : <Button className="comment-btn" type="primary" htmlType="submit">Send</Button>}</div>
                                    </Form>
                                    <Divider />
                                </>
                                : <p style={{ textAlign: 'center', fontWeight: 'bold' }}>Please <Link to={`/login`}>Log In</Link> to write a comment</p>
                            }

                            <div className="project-view-comments">
                            <h3 className="project-view-comments-header">{c.length} {c.length > 1 || c.length === 0 ? 'comments' : 'comment'} </h3>
                                {c?.map((c: any, i: number) => (
                                    <Comment 
                                        key={i} 
                                        comment={c} 
                                        handleUpdateComment={handleUpdateComment}
                                        handleDeleteComment={handleDeleteComment}
                                    />
                                ))}
                            </div>

                        </div>
                        <div className="project-view-right-col">
                            <a href={project.url}><Button className="website-btn" icon={<DesktopOutlined />} type="primary">Website</Button></a>
                            {project.repo ?<a href={project.repo}><Button className="repo-btn" icon={<CodeOutlined />} type="primary">Repository</Button></a> : '' }
                            <Divider />
                            <div className="project-view-tags">
                                <TagFilled className="svg-filled" />
                                <ul>{project.technologies.map((technology: string, i: number) => <Link key={i} to={`/tag/tech/${technology}`}><li style={{ listStyle: 'none' }}>{technology}</li></Link>)}</ul>
                            </div>
                            <div className="project-view-tags">
                                <TagsFilled className="svg-filled"  />
                                <ul>{project.tags.map((category: string) => <Link to={`/tag/category/${category}`}><li style={{ listStyle: 'none' }}>{category}</li></Link>)}</ul>
                            </div>
                            <Divider />
                            <div className="project-view-details">
                                <ul>
                                <li><FireFilled className="svg-filled" /> {likeCount}</li>
                                    {project.collaboration && <li><CheckCircleFilled className="svg-filled" /> Interested in collaborating</li>}
                                    <li><CalendarFilled className="svg-filled" /> Created June 4, 2020</li>
                                    <li><FlagFilled className="svg-filled" /> <button style={{background: 'none', border: 'none', padding: 0}} onClick={showReportProjectModal}>Report</button></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </>
            }
            <Modal
                title="Report Project"
                visible={visible}
                onOk={handleReportProject}
                onCancel={handleCancel}
                okText="Submit"
                >
                <Radio.Group onChange={onChange} value={value}>
                    <Radio style={radioStyle} value={'1'}>
                        Offensive
                    </Radio>
                    <Radio style={radioStyle} value={'2'}>
                        Sexual/NSFW
                    </Radio>
                    <Radio style={radioStyle} value={'3'}>
                        Illegal
                    </Radio>
                    <Radio style={radioStyle} value={'4'}>
                        Spam
                    </Radio>
                </Radio.Group>
            </Modal>
        </div>
    )
}

export default Project;