import React, { useState, useEffect } from 'react';
import {
    Form,
    Input,
    Select,
    Switch,
    Upload,
    Modal,
    Button,
    Tooltip,
    Divider,
    Popconfirm,
    message
} from 'antd';
import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import Spinner from './spinner';
import ApiService from '../lib/apiService';
import history from '../lib/history';
import Placeholder from '../lib/placeholders';
import { technologies, tags } from '../lib/const';
import { siteName } from '../lib/const';
import UrlValidation from '../lib/urlValidation';

import '../styles/form.scss';

interface IFormLayoutChange {
    size: string;
}

interface IUploadChange {
    fileList: string[];
}

interface IHandleRemove {
    [name: string]: { uid: string };
}

interface IHandlePreview {
    url: string;
    preview: string;
    originFileObj: Blob;
    name: string;
}

interface IFields {
    name: string;
    description: string;
    tagline: string;
    url: string;
    repourl: string;
    technologies: string;
    tags: string;
    collaboration: string;
}

const ProjectEdit = () => {
    const api = new ApiService();
    const id = window.location.pathname.split('/')[3];
    useEffect(() => {

        const techArray: string[] = [];
        const tagArray: string[] = [];

        if (localStorage.getItem('userID') === 'undefined') {
            history.push('/');
            return;
        }

        const fetch = async () => {
            setIsLoading(true);

            const project = await api.getProject(id);


            if (project.status === 200) {
                const data = await project.json();

                setFileList([{
                    uid: '-1',
                    url: data.project.images[0]
                }]);

                setFileListUpload([data.project.images[0]]);

                for (let key in technologies) {
                    if (data.project.technologies.includes(technologies[key].slug)) {
                        techArray.push(technologies[key].slug);
                    }
                }

                for (let key in tags) {
                    if (data.project.tags.includes(tags[key])) {
                        tagArray.push(tags[key]);
                    }
                }

                setTechnologiesSelect(techArray);
                setTagSelect(tagArray);
                setProject(data.project);
                setIsLoading(false);

                document.title = `${data.project.name} Edit | ${siteName}`
            }
        }

        fetch();

    }, [])

    const placeholder = new Placeholder();
    const [componentSize, setComponentSize] = useState('medium');
    const [technologiesSelect, setTechnologiesSelect] = useState<any>([]);
    const [tagsSelect, setTagSelect] = useState<any>([]);
    const [previewVisible, setPreviewVisible] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState<string>('');
    const [previewTitle, setPreviewTitle] = useState<string>('');
    const [fileList, setFileList] = useState<any[]>([]);              // list of files uploaded locally used by antd
    const [fileListUpload, setFileListUpload] = useState<any>([]);    // list of files uploaded to cloduinary
    const [project, setProject] = useState<any>({});
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const { Option } = Select;
    const childrenTech = [];
    const childrenTags = [];

    for(let key in technologies) {
        childrenTech.push(<Option key={key} value={`${technologies[key].slug}`}>{technologies[key].name}</Option>);
    }

    for (let key in tags) {
        childrenTags.push(<Option key={key} value={`${tags[key]}`}>{tags[key]}</Option>);
    }

    const onFormLayoutChange = ({ size }: IFormLayoutChange) => {
        setComponentSize(size);
    };

    const getBase64 = (file: Blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
        });
    }

    const onSelectTechnologyChange = (value: string[]) => {
        setTechnologiesSelect(value);
    }

    const onSelectTagChange = (value: string) => {
        setTagSelect([value]);
    }

    const handleCancel = () => setPreviewVisible(false);

    const handlePreview = async (file: IHandlePreview) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj) as string;
        }

        setPreviewTitle(file.name);
        setPreviewImage(file.url || file.preview);
        setPreviewVisible(true);
    }

    const handleOnRemove = (info: IHandleRemove) => {
        let antdIndexPos: number | null = null;

        const removedFileUID = info.uid;

        for (let i = 0; i < fileList.length; i++) {
            if (fileList[i].uid === removedFileUID) {
                antdIndexPos = i;
            }
        }

        setFileListUpload([fileListUpload.slice(0, antdIndexPos!).concat(fileListUpload.slice(antdIndexPos! + 1))]);
    }

    const handleOnFinish = async (values: IFields) => {

        const { name, description, tagline, url, repourl, collaboration } = values;
        const userID = localStorage.getItem('userID') as string;
        const id = window.location.pathname.split('/')[3];
        const techArray: any = [];
        const tagArray: any = [];
        const form = new FormData();

        for (let key in technologies) {
            if (technologiesSelect.includes(technologies[key].slug)) {
                techArray.push(key);
            }
        }

        for (let key in tags) {
            if (tagsSelect.includes(tags[key])) {
                tagArray.push(key);
            }
        }

        form.append('name', name);
        form.append('description', description);
        form.append('tagline', tagline);
        form.append('url', url);
        form.append('repourl', repourl);
        form.append('technologies', techArray);
        form.append('tags', tagArray);
        form.append('collaboration', collaboration || project.collaboration);
        form.append('screenshots', fileListUpload.length ? fileListUpload[fileListUpload.length - 1] : placeholder.project());
        form.append('user_id', userID);
        
        const res = await api.updateProject(id, form);

        if (res.status === 200) {
            history.push('/');
        }

        message.success('Project successfully updated');
    }

    const handleUploadChange = ({ fileList }: IUploadChange) => {
        setFileList(fileList)
    };

    const customRequest = (file: { file: string | Blob; onProgress: (arg0: (e: any) => void) => void; onSuccess: (arg0: (e: any) => void) => void; }) => {
        const data = new FormData()
        data.append('file', file.file)
        const config = {
            method: "POST",
            body: data
        }

        fetch(`${process.env.REACT_APP_SERVER}/api/image/upload`, config).then((res: any) => {
            return res.json();
        }).then(data => {
            file.onProgress(e => console.log(e));
            file.onSuccess(e => console.log(e));

            setFileListUpload([...fileListUpload, data.secure_url]);

            document.title = `Project Settings | ${siteName}`;
        }).catch((err: Error) => {
            console.log(err)
        })
    }

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    const confirm = (e: any, id: string) => {
        handleOnDelete(id);
    }

    const cancel = () => {
        //console.log(e);
    }

    const handleOnDelete = async (id: string) => {
        const form = new FormData();

        form.append('project_id', id);
        const res = await api.deleteProject(id, form);

        history.push(`/user/${localStorage.getItem('username')}`)
    }

    return (
        <div>
            {isLoading ? <Spinner /> :
                <div>
                    <h1>Update Project</h1>
                    <div className="form-wrapper">
                        <Form
                            layout="vertical"
                            initialValues={{
                                size: componentSize,
                                name: project.name,
                                tagline: project.tagline,
                                description: project.description,
                                technologies: technologiesSelect,
                                tags: tagsSelect,
                                url: project.url,
                                repourl: project.repo
                            }}
                            onFinish={handleOnFinish as any}
                            onValuesChange={onFormLayoutChange as any}
                        >
                            <Form.Item
                                label="Project Name"
                                name="name"
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Tagline"
                                name="tagline"
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                name="description"
                                label="Tell us about your project (features, tech stack, motivation)"
                                rules={[{ required: true, message: 'Required' }]}
                            >
                                <Input.TextArea />
                            </Form.Item>
                            <Form.Item
                    label={<span><strong>
                        Website&nbsp;
                        <Tooltip title="Url of your website">
                            <QuestionCircleOutlined />
                        </Tooltip>
                        </strong></span>}
                    name="url"
                    rules={[{ required: true, message: 'Required' },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (UrlValidation(value)) {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error('Invalid Url'));
                            },
                        }),
                    ]}
                >
                    <Input 
                        placeholder="https://mysite.com"
                    />
                </Form.Item>
                <Form.Item
                    label={<span><strong>
                        Repository Url&nbsp;
                        <Tooltip title="Url of your project repository">
                            <QuestionCircleOutlined />
                        </Tooltip>
                        </strong></span>}
                    name="repourl"
                    rules={[{ required: false, message: 'Required' },
                        ({ getFieldValue }) => ({
                            validator(rule, value) {
                                if (UrlValidation(value) || value === '') {
                                    return Promise.resolve();
                                }

                                return Promise.reject(new Error('Invalid Url'));
                            },
                        }),
                    ]}
                >
                    <Input 
                        placeholder="https://mysite.com"
                    />
                </Form.Item>
                            <Form.Item
                                label="Technologies"
                                name="technologies"
                                rules={[{ required: true, message: 'Must select at least one' }]}
                            >
                                <Select
                                    mode="multiple"
                                    style={{ width: '100%' }}
                                    placeholder="Please select"
                                    onChange={onSelectTechnologyChange as any}
                                >
                                    {childrenTech}
                                </Select>
                            </Form.Item>
                            <Form.Item
                                label="Tags"
                                name="tags"
                                rules={[{ required: true, message: 'Must select at least one' }]}
                            >
                                <Select
                                    style={{ width: '100%' }}
                                    placeholder="Please select"
                                    onChange={onSelectTagChange as any}
                                >
                                    {childrenTags}
                                </Select>
                            </Form.Item>
                            <Form.Item label={<span>
                                Collaboration&nbsp;
            <Tooltip title="Are you interested in collaborating with other developers?">
                                    <QuestionCircleOutlined />
                                </Tooltip>
                            </span>}
                                name="collaboration"
                            >
                                <Switch checkedChildren="Yes" unCheckedChildren="No" defaultChecked={project.collaboration} />
                            </Form.Item>
                            <Form.Item label="Add Thumbnail">
                                <p>Add a thumbnail(250x250) and a screenshot of your project.</p>
                                <div className="clearfix">
                                    <Upload
                                        listType="picture-card"
                                        fileList={fileList as any[]}
                                        onPreview={handlePreview as any}
                                        onChange={handleUploadChange as any}
                                        onRemove={handleOnRemove as any}
                                        customRequest={customRequest as any}
                                    >
                                        {fileList.length >= 1 ? null : uploadButton}
                                    </Upload>
                                    <Modal
                                        visible={previewVisible}
                                        title={previewTitle}
                                        footer={null}
                                        onCancel={handleCancel}
                                    >
                                        <img alt="example" style={{ width: '100%' }} src={previewImage} />
                                    </Modal>
                                </div>
                            </Form.Item>
                            <div className="form-btn-wrap">
                                <Button type="primary" htmlType="submit">Submit</Button>
                            </div>

                        </Form>
                    </div>
                </div>
            }

            <Divider />
            <div>
                <h1>Delete Account</h1>
                <div className="form-wrapper">
                    <p>Once you delete this project, there is no going back. Please be certain. </p>
                    <Popconfirm
                        title="Are you sure you want to delete this project?"
                        onConfirm={(e) => confirm(e, id)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <div className="form-btn-wrap">
                            <Button type="primary" danger>Delete</Button>
                        </div>
                    </Popconfirm>
                </div>
            </div>
        </div>
    )
};

export default ProjectEdit;

