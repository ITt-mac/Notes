import React from 'react'
import { Modal, Form, Input, Checkbox } from 'antd'

const FormItem = Form.Item

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

class Ui extends React.Component {
  render() {
    const { getFieldDecorator, validateFields, getFieldsValue } = this.props.form
    const that = this
    const handleOk = () => {
      validateFields((errors) => {
        if (errors) {
          return
        }

        const data = {
          ...getFieldsValue(),
        }
        data.no_verify = data.no_verify ? 1 : 0
        that.props.ok(data)
      })
    }
    return (
      <Modal
        zIndex={9999}
        title="安全效验"
        maskClosable={false}
        visible={this.props.visible}
        onCancel={this.props.hideVisible}
        onOk={handleOk}
        confirmLoading={this.props.confirmLoading}
      >
        <Form layout="horizontal">
          <FormItem label="您的管理密码" hasFeedback {...formItemLayout} style={{marginBottom: 10}}>
            {getFieldDecorator('safety_password', {
              rules: [
                {
                  required: true,
                  message: '您的管理密码必须填写',
                },
              ],
            })(<Input type="password" />)}
          </FormItem>
          <FormItem {...formItemLayout} wrapperCol={{offset: 6}}>
            {getFieldDecorator('no_verify', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>在{this.props.protectionMinute}分钟内不需要再次安全效验</Checkbox>
            )}
          </FormItem>
        </Form>
      </Modal>
    )
  }
}

export default Form.create()(Ui)
