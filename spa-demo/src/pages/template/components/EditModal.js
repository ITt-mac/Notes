import React from "react";
import PropTypes from "prop-types";
import { Form, Input, Radio, Modal, Select } from "antd";
import styles from "./Modal.less";

const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 14,
  },
};

const modal = ({
  item,
  onOk,
  contentLength,
  handleContentWordsLengthChange,
  form: { getFieldDecorator, validateFields, getFieldsValue },
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields(errors => {
      if (errors) {
        return;
      }
      const data = {
        ...getFieldsValue(),
        id: item.id,
      };
      onOk(data);
    });
  };

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  };

  function handleChange(e) {
    handleContentWordsLengthChange(e.target.value.length);
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="模板类型" {...formItemLayout}>
          {getFieldDecorator("type", {
            initialValue: item.type,
            rules: [
              {
                required: true,
              },
            ],
          })(
            <Select style={{ width: 120 }}>
              <Option value={1}>短信验证码</Option>
              <Option value={2}>短信通知</Option>
              <Option value={3}>邮件验证码</Option>
              <Option value={4}>邮件通知</Option>
              <Option value={5}>站内信</Option>
            </Select>
          )}
        </FormItem>

        <FormItem label="标题" hasFeedback {...formItemLayout}>
          {getFieldDecorator("title", {
            initialValue: item.title,
            rules: [
              {
                required: true,
                message: "请填写标题",
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="编码" hasFeedback {...formItemLayout}>
          {getFieldDecorator("code", {
            initialValue: item.code,
            rules: [
              {
                required: true,
                message: "请填写编码",
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="模板内容" hasFeedback {...formItemLayout}>
          {getFieldDecorator("content", {
            initialValue: item.content,
            rules: [
              {
                required: true,
                message: "请填写模板内容",
              },
            ],
          })(
            <TextArea
              onChange={handleChange}
              placeholder="请填写模板内容"
              autosize={{ minRows: 2, maxRows: 6 }}
            />
          )}
          <span className={styles.wordsLength}>已填充{contentLength}字</span>
        </FormItem>
        <FormItem label="状态" {...formItemLayout}>
          {getFieldDecorator("status", {
            initialValue: item.status === undefined ? 1 : item.status,
            rules: [
              {
                required: true,
                message: "请选择状态",
              },
            ],
          })(
            <Radio.Group>
              <Radio value={1}>启用</Radio>
              <Radio value={0}>禁用</Radio>
            </Radio.Group>
          )}
        </FormItem>
      </Form>
    </Modal>
  );
};

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
};

export default Form.create()(modal);
