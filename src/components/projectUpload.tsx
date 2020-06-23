import React, { useState } from 'react';
import {
    Form,
    Input,
    Select,
    Switch,
    Upload,
    Modal,
    Button,
    Tooltip
} from 'antd';
import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import ApiService from '../lib/apiService';
import history from '../lib/history';
import Placeholder from '../lib/placeholders';
import { technologies, tags } from '../lib/const';

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
    technologies: string;
    tags: string;
    collaboration: string;
}

const ProjectUpload = () => {
    const api = new ApiService();
    const placeholder = new Placeholder();
    const [componentSize, setComponentSize] = useState('medium');
    const [technologiesSelect, setTechnologiesSelect] = useState<any>([]);
    const [tagsSelect, setTagSelect] = useState<any>([]);
    const [previewVisible, setPreviewVisible] = useState<boolean>(false);
    const [previewImage, setPreviewImage] = useState<string>('');
    const [previewTitle, setPreviewTitle] = useState<string>('');
    const [fileList, setFileList] = useState<any[]>([]);              // list of files uploaded locally used by antd
    const [fileListUpload, setFileListUpload] = useState<any>([]);    // list of files uploaded to cloduinary

    const { Option } = Select;

    const childrenTech = [];
    const childrenTags = [];

    for(let key in technologies) {
        childrenTech.push(<Option key={key} value={`${technologies[key]}`}>{technologies[key]}</Option>);
    }

    for(let key in tags) {
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
        const { name, description, tagline, url, collaboration } = values;
        const userID = localStorage.getItem('userID') as string;
        const form = new FormData();
        const techArray: any = [];
        const tagArray: any = [];

        for(let key in technologies) {
            if(technologiesSelect.includes(technologies[key])) {
                techArray.push(key);
            }
        }

        for(let key in tags) {
            if(tagsSelect.includes(tags[key])) {
                tagArray.push(key);
            }
        }

        form.append('name', name);
        form.append('description', description);
        form.append('tagline', tagline);
        form.append('url', url);
        form.append('technologies', techArray);
        form.append('tags', tagArray);
        form.append('collaboration', collaboration);
        form.append('screenshots', fileListUpload.length ? fileListUpload[fileListUpload.length - 1] : placeholder.project());
        form.append('user_id', userID);
        
        const res = await api.createProject(form);
        
        if (res.status === 200) {
            history.push('/');
        }
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

    return (
        <div>
            <Form
                labelCol={{
                    span: 28,
                }}
                wrapperCol={{
                    span: 14,
                }}
                layout="vertical"
                initialValues={{
                    size: componentSize,
                    collaboration: false,
                    technologies: [],
                    tags: []
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
                    label="Website"
                    name="url"
                    rules={[{ required: true, message: 'Required' }]}
                >
                    <Input />
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
                    <Switch checkedChildren="Yes" unCheckedChildren="No" />
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
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form>
        </div>
    )
};

export default ProjectUpload;

