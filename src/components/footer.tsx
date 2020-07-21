import React, { useState } from 'react';
import { Layout, Modal, Button } from 'antd';
import { Link } from 'react-router-dom';
import { subscriberUrl } from '../lib/const';
import '../styles/footer.scss';

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
    <Layout.Footer style={{ background: 'none' }}>
      <ul>
        <li>
          <Link to={`/guidelines`}>
            Guidelines
          </Link>
        </li>
        <li>
          <Link to={`/feedback`}>
            Feedback
          </Link>
        </li>
        <li>
          <Button type="primary" onClick={showModal}>Subscribe</Button>
        </li>
      </ul>
  <p className="copyright">CodeComplex &copy;	{new Date().getFullYear()}</p>

    <Modal
          visible={visible}
          onOk={handleOk}
          onCancel={handleCancel}
          className="subscribe-modal"
        >
          <iframe style={{border: 0, width: '100%', height: '410px'}} src="https://cdn.forms-content.sg-form.com/78813c67-c591-11ea-a395-12612d9b4aa6"/>
        </Modal>
  </Layout.Footer>
  )
};

export default Footer;
