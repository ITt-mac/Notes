import React, { Component } from 'react';
// import PropTypes from 'prop-types'
import { Modal, Form } from 'antd';

import MyForm from './commonForm';

class ModalForm extends Component {
  handleOk = () => {
    this.formVal.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleSave(values);
      }
    });
  };

  render() {
    // items格式即为上文配置的表单项
    const { items, modalFormVisble, handleCancel, title } = this.props;

    return (
      <Modal
        title={title}
        visible={modalFormVisble}
        onOk={this.handleOk}
        onCancel={handleCancel}>
        <MyForm
          items={items}
          wrappedComponentRef={myForm => {
            this.formVal = myForm;
          }}
        />
      </Modal>
    );
  }
}

export default Form.create()(ModalForm);
