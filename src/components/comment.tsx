import React, { useState } from "react";
import ApiService from "../lib/apiService";
import { Link } from "react-router-dom";
import Linkify from "react-linkify";
import { EllipsisOutlined } from "@ant-design/icons";
import {
  Radio,
  Modal,
  Form,
  Input,
  Button,
  Divider,
  message,
  Popover,
} from "antd";
import moment from "moment";
import "../styles/global.scss";
import "../styles/project.scss";

interface Props {
  comment: any;
  handleUpdateComment: any;
  handleDeleteComment: any;
  userId: any;
}

const Comment = ({
  comment,
  handleUpdateComment,
  handleDeleteComment,
  userId,
}: Props) => {
  const api = new ApiService();
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const radioStyle = {
    display: "block",
    height: "30px",
    lineHeight: "30px",
  };

  const [isCommentEditing, setIsCommentEditing] = useState<boolean>(false);
  const [isCommentSubmitting, setIsCommentSubmitting] = useState<boolean>(
    false
  );
  const [visible2, setVisible2] = useState<boolean>(false);
  const [value2, setValue2] = useState<string>("1");
  const [commentID, setCommentID] = useState<number | null>(null);

  const editComment = () => {
    setIsCommentEditing(true);
  };

  const handleSubmit = (values: any, id: any) => {
    handleUpdateComment(values, id);
    setIsCommentEditing(false);
    form.resetFields();
  };

  const handleCommentEditCancel = () => {
    setIsCommentEditing(false);
  };

  const showReportCommentModal = (commentID: number) => {
    setVisible2(true);
    setCommentID(commentID);
  };

  const handleReportComment = async () => {
    const form = new FormData();
    form.append("comment_id", commentID!.toString());
    form.append("comment", value2);
    await api.reportComment(form);
    message.success("Comment has been reported");
    setVisible2(false);
  };

  const handleCancel2 = () => {
    setVisible2(false);
    setCommentID(null);
  };

  const handleDelete = (id: number) => {
    handleDeleteComment(id);
  };

  const onChange2 = (e: any) => setValue2(e.target.value);

  return (
    <div className="project-view-comment" key={comment.comment_id}>
      <div className="project-view-comment-top-wrapper">
        <img
          className="user-avatar-img"
          src={comment.gh_avatar}
          alt={`${comment.username}'s profile`}
        />
        <Link
          to={`/user/${comment.username}`}
          className="project-view-comment-user"
        >
          {comment.username}
        </Link>
      </div>
      {isCommentEditing ? (
        <Form
          className="form-update-comment"
          form={form}
          layout="vertical"
          onFinish={(values) => handleSubmit(values, comment.comment_id) as any}
          initialValues={{ updateComment: comment.comment }}
        >
          <Form.Item
            name="updateComment"
            rules={[{ required: true, message: "Required" }]}
          >
            <TextArea
              placeholder="What do you think of this project?"
              rows={2}
            />
          </Form.Item>
          <div>
            {isCommentSubmitting ? (
              <Button type="primary" disabled>
                Send
              </Button>
            ) : (
              <div>
                <Button
                  className="comment-btn comment-edit-btn"
                  type="primary"
                  htmlType="submit"
                >
                  Send
                </Button>
                <Button
                  onClick={handleCommentEditCancel}
                  className="comment-btn"
                >
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </Form>
      ) : (
        <div className="project-view-comment-body">
          <Linkify>
            <p>{comment.comment}</p>
          </Linkify>
          <div className="project-comment-below">
            <small style={{ marginRight: "20px" }}>
              {moment(comment.created_on).fromNow()}
            </small>
            <Popover
              content={
                <div>
                  <p
                    className="popover-btn"
                    onClick={() => showReportCommentModal(comment.comment_id)}
                  >
                    Report
                  </p>
                  {comment.user_id && comment.user_id === userId ? (
                    <>
                      <p className="popover-btn" onClick={editComment}>
                        Edit
                      </p>
                      <p
                        className="popover-btn"
                        onClick={() => handleDelete(comment.comment_id)}
                      >
                        Delete
                      </p>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              }
              trigger="click"
            >
              <EllipsisOutlined style={{ fontSize: "20px" }} />
            </Popover>
          </div>
        </div>
      )}

      <Divider />

      <Modal
        title="Report Comment"
        visible={visible2}
        onOk={handleReportComment}
        onCancel={handleCancel2}
        okText="Submit"
      >
        <Radio.Group onChange={onChange2} value={value2}>
          <Radio style={radioStyle} value={"1"}>
            Offensive
          </Radio>
          <Radio style={radioStyle} value={"2"}>
            Duplicate
          </Radio>
          <Radio style={radioStyle} value={"3"}>
            Not working
          </Radio>
          <Radio style={radioStyle} value={"4"}>
            Spam
          </Radio>
        </Radio.Group>
      </Modal>
    </div>
  );
};

export default Comment;
