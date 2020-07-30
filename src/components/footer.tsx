import React, { useState } from "react";
import { Layout, Button } from "antd";
import { Link } from "react-router-dom";
import SubscribeForm from "./subscribeForm";
import "../styles/footer.scss";

const Footer: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Layout.Footer style={{ background: "none" }}>
      <ul>
        <li>
          <Link to={`/guidelines`}>Guidelines</Link>
        </li>
        <li>
          <Link to={`/feedback`}>Feedback</Link>
        </li>
        <li>
          <Button type="primary" onClick={showModal}>
            Subscribe
          </Button>
        </li>
      </ul>
      <p className="copyright">CodeComplex &copy; {new Date().getFullYear()}</p>
      <SubscribeForm
        handleOk={handleOk}
        handleCancel={handleCancel}
        isVisible={visible}
      />
    </Layout.Footer>
  );
};

export default Footer;
