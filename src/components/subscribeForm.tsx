import React, { useState } from "react";
import { Modal } from "antd";
import { subscriberUrl } from "../lib/const";

interface Props {
  isVisible: boolean;
  handleOk: () => void;
  handleCancel: () => void;
}

const SubscribeForm = ({ isVisible, handleOk, handleCancel }: Props) => {
  return (
    <Modal
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      className="subscribe-modal"
    >
      <iframe
        style={{ border: 0, width: "100%", height: "410px" }}
        src={subscriberUrl}
      />
    </Modal>
  );
};

export default SubscribeForm;
