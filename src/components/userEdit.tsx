import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Upload,
  Modal,
  Button,
  Divider,
  Popconfirm,
  message,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Spinner from "./spinner";
import ApiService from "../lib/apiService";
import AuthService from "../lib/authService";
import history from "../lib/history";
import Placeholder from "../lib/placeholders";
import { siteName } from "../lib/const";
import { urlValidation } from "../lib/urlValidation";
import "../styles/form.scss";
import "../styles/global.scss";
import { Redirect } from "react-router-dom";
import ParseDom from "../lib/domParser";

const { TextArea } = Input;

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

interface IUserProfile {
  children?: React.ReactNode;
  match: any;
}

const UserEdit = ({ match }: IUserProfile) => {
  const api = new ApiService();
  const auth = new AuthService();
  const username = match.params.username;

  useEffect(() => {
    const fetch = async () => {
      const userFetch = await api.userAuth();
      const userData = await userFetch.json();

      if (userData.username !== username) {
        setRedirect(true);
        return;
      }

      const userProfileFetch = await api.getUserProfile(userData.username);
      const userProfile = await userProfileFetch.json();

      setFileList([
        {
          uid: "-1",
          url: userProfile.data.user.gh_avatar,
        },
      ]);

      setFileListUpload([userProfile.data.user.gh_avatar]);
      setUser(userProfile.data.user);
      setIsLoading(false);

      document.title = `Settings | ${siteName}`;
    };

    fetch();
  }, []);

  const placeholder = new Placeholder();
  const [user, setUser] = useState<any>({});
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [previewTitle, setPreviewTitle] = useState<string>("");
  const [fileList, setFileList] = useState<any[]>([]); // list of files uploaded locally used by antd
  const [fileListUpload, setFileListUpload] = useState<any>([]); // list of files uploaded to cloduinary
  const [componentSize, setComponentSize] = useState("medium");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [redirect, setRedirect] = useState<boolean>(false);
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(false);

  const onFormLayoutChange = ({ size }: IFormLayoutChange) => {
    setComponentSize(size);
  };

  const getBase64 = (file: Blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = async (file: IHandlePreview) => {
    if (!file.url && !file.preview) {
      file.preview = (await getBase64(file.originFileObj)) as string;
    }

    setPreviewTitle(file.name);
    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
  };

  const handleOnRemove = (info: IHandleRemove) => {
    let antdIndexPos: number | null = null;

    const removedFileUID = info.uid;

    for (let i = 0; i < fileList.length; i++) {
      if (fileList[i].uid === removedFileUID) {
        antdIndexPos = i;
      }
    }

    setFileListUpload([
      fileListUpload
        .slice(0, antdIndexPos!)
        .concat(fileListUpload.slice(antdIndexPos! + 1)),
    ]);
  };

  const handleOnFinish = async (values: any) => {
    const { description, github, twitter, portfolio } = values;
    const form = new FormData();

    form.append("description", ParseDom(description));
    form.append("githubUrl", github);
    form.append("twitterUrl", twitter);
    form.append("userProfileUrl", portfolio);
    form.append(
      "profilePic",
      fileListUpload.length
        ? fileListUpload[fileListUpload.length - 1]
        : placeholder.user()
    );

    const res = await api.updateUser(user.id, form);

    if (res.status === 200) {
      history.push(`/user/${user.username}`);
    }
  };

  const handleChangePassword = async (values: any) => {
    const { currentPassword, newPassword } = values;
    const form = new FormData();

    form.append("userID", user.id);
    form.append("newPassword", newPassword);
    form.append("currentPassword", currentPassword);

    const res = await api.updatePassword(form);

    if (res.status === 200) {
      history.push(`/user/${user.username}`);
    }

    setError(true);
  };

  const handleUploadChange = ({ fileList }: IUploadChange) => {
    setFileList(fileList);
  };

  const customRequest = (file: {
    file: string | Blob;
    onProgress: (arg0: (e: any) => void) => void;
    onSuccess: (arg0: (e: any) => void) => void;
  }) => {
    const data = new FormData();
    data.append("file", file.file);
    const config = {
      method: "POST",
      body: data,
    };

    fetch(`${process.env.REACT_APP_SERVER}/image/upload`, config)
      .then((res: any) => {
        return res.json();
      })
      .then((data) => {
        file.onProgress((e) => console.log(e));
        file.onSuccess((e) => console.log(e));

        setFileListUpload([...fileListUpload, data.secure_url]);
        setSubmitDisabled(false);
      })
      .catch((err: Error) => {
        console.log(err);
      });
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const confirm = () => {
    handleOnDelete();
  };

  const cancel = () => {
    //console.log(e);
  };

  const handleOnDelete = async () => {
    const form = new FormData();

    form.append("user_id", user.id);
    await auth.signout(new FormData());
    await api.deleteUser(user.id, form);
    window.location.replace(process.env.REACT_APP_HOSTNAME as string);
  };

  const handleBeforeUpload = (file: any, fileList: any) => {
    const fileSize = file.size;
    const fileType = ["image/jpeg", "image/jpg", "image/png", "image/gif"];
    const validFileExt = fileType.includes(file.type);

    // check if file extension is valid
    if (!validFileExt) {
      message.error({
        content: "File type must be jpeg, jpg, png, gif",
        duration: 10,
      });
      setSubmitDisabled(true);
      return false;
    }

    // check file size
    if (fileSize > 800000) {
      message.error({
        content: "File size must be smaller than 800KB",
        duration: 10,
      });
      setSubmitDisabled(true);
      return false;
    }
  };

  return redirect ? (
    <Redirect to="/" />
  ) : (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="container">
          <h1>Change Password</h1>
          <div className="form-wrapper">
            <Form
              layout="vertical"
              onFinish={handleChangePassword as any}
              onValuesChange={onFormLayoutChange as any}
            >
              <Form.Item
                label={
                  <span>
                    <strong>Current Password</strong>
                  </span>
                }
                name="currentPassword"
              >
                <Input type="password" placeholder="Password" />
              </Form.Item>
              <Form.Item
                name="newPassword"
                label={
                  <span>
                    <strong>New Password</strong>
                  </span>
                }
                rules={[
                  {
                    message: "Required",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label={
                  <span>
                    <strong>Confirm Password</strong>
                  </span>
                }
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    message: "Required",
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue("newPassword") === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        new Error("Passwords do not match")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>
              <p className="error-msg">
                {error ? "Password is incorrect" : ""}
              </p>

              <div className="form-btn-wrap">
                <Button type="primary" htmlType="submit">
                  Change Password
                </Button>
              </div>
            </Form>
          </div>
          <Divider />
          <div>
            <h1>Update Profile</h1>
            <div className="form-wrapper">
              <Form
                layout="vertical"
                onFinish={handleOnFinish as any}
                onValuesChange={onFormLayoutChange as any}
                initialValues={{
                  description: user.description,
                  github: user.gh_profile_url || "",
                  twitter: user.twitter_profile_url || "",
                  portfolio: user.user_profile_url || "",
                }}
              >
                <Form.Item
                  label={
                    <span>
                      <strong>Bio</strong>
                      <p className="form-tooltip">
                        Short description for your profile.
                      </p>
                    </span>
                  }
                  name="description"
                >
                  <TextArea rows={2} />
                </Form.Item>
                <Form.Item
                  label={
                    <span>
                      <strong>Portfolio Url</strong>
                      <p className="form-tooltip">
                        Your portfolio or blog site.
                      </p>
                    </span>
                  }
                  name="portfolio"
                  rules={[
                    { required: false, message: "Required" },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (urlValidation(value) || value === "") {
                          return Promise.resolve();
                        }

                        return Promise.reject(new Error("Invalid Url"));
                      },
                    }),
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label={
                    <span>
                      <strong>Github Url</strong>
                    </span>
                  }
                  name="github"
                  rules={[
                    { required: false, message: "Required" },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (urlValidation(value) || value === "") {
                          return Promise.resolve();
                        }

                        return Promise.reject(new Error("Invalid Url"));
                      },
                    }),
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label={
                    <span>
                      <strong>Twitter Url</strong>
                    </span>
                  }
                  name="twitter"
                  rules={[
                    { required: false, message: "Required" },
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (urlValidation(value) || value === "") {
                          return Promise.resolve();
                        }

                        return Promise.reject(new Error("Invalid Url"));
                      },
                    }),
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label={
                    <span>
                      <strong>Profile Picture</strong>
                      <p className="form-tooltip">
                        JPG, GIF or PNG. Max size of 800K
                      </p>
                    </span>
                  }
                >
                  <div className="clearfix">
                    <Upload
                      listType="picture-card"
                      fileList={fileList as any[]}
                      beforeUpload={handleBeforeUpload as any}
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
                      <img
                        alt="example"
                        style={{ width: "100%" }}
                        src={previewImage}
                      />
                    </Modal>
                  </div>
                </Form.Item>
                <div className="form-btn-wrap">
                  {submitDisabled ? (
                    <Button
                      className="upload-btn"
                      type="primary"
                      htmlType="submit"
                      disabled
                    >
                      Submit
                    </Button>
                  ) : (
                    <Button
                      className="upload-btn"
                      type="primary"
                      htmlType="submit"
                    >
                      Submit
                    </Button>
                  )}
                </div>
              </Form>
            </div>
          </div>
          <Divider />
          <div>
            <h1>Delete Account</h1>
            <div className="form-wrapper">
              <p>
                Once you delete this account, there is no going back. Please be
                certain.{" "}
              </p>
              <Popconfirm
                title="Are you sure you want to delete this account?"
                onConfirm={(e) => confirm()}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
              >
                <div className="form-btn-wrap">
                  <Button type="primary" danger>
                    Delete
                  </Button>
                </div>
              </Popconfirm>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserEdit;
