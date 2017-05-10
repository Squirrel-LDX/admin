import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber, Radio, Modal, Cascader, Select } from 'antd'
// import city from '../../utils/city'

const FormItem = Form.Item
Option = Select.Option

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
  item = {},
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      }
      onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="UserName" hasFeedback {...formItemLayout}>
          {getFieldDecorator('username', {
            initialValue: item.username,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="Gender" hasFeedback {...formItemLayout}>
          {getFieldDecorator('isMale', {
            initialValue: item.isMale,
            rules: [
              {
                required: true,
                type: 'boolean',
              },
            ],
          })(
            <Radio.Group>
              <Radio value>Male</Radio>
              <Radio value={false}>Female</Radio>
            </Radio.Group>
          )}
        </FormItem>
        <FormItem label="Phone" hasFeedback {...formItemLayout}>
          {getFieldDecorator('phone', {
            initialValue: item.phone,
            rules: [
              {
                required: true,
                pattern: /^1[34578]\d{9}$/,
                message: 'The input is not valid phone!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="QQ" hasFeedback {...formItemLayout}>
          {getFieldDecorator('QQ', {
            initialValue: item.QQ,
            rules: [
              {
                required: true,
                pattern: /^\d{5,12}$/,
                message: 'The input is not valid QQ!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="GoodsNum" hasFeedback {...formItemLayout}>
          {getFieldDecorator('goodsNum', {
            initialValue: item.goodsNum,
            rules: [
              {
                required: true,
                pattern: /^\d{1,2}$/,
                message: 'The input is should not lg than 100!',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="Power" hasFeedback {...formItemLayout}>
          {getFieldDecorator('power', {
            initialValue: item.power,
            rules: [
              {
                required: true,
                pattern: /^\d{2}$/,
                message: 'The input is not valid power!',
              },
            ],
          })(
            <Select>
              <Option value={10}>普通</Option>
              <Option value={90}>VIP</Option>
            </Select>
          )}
        </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
