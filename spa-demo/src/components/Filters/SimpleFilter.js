import React from 'react'
import { Form, Button, Row, Col, Input, Select } from 'antd'
import Writexlsx from '../Writexlsx'
const Option = Select.Option
const FormItem = Form.Item
const Search = Input.Search

const ColProps = {
  xs: 24,
  sm: 12,
}

const formItemStyle = {
  style: {
    marginBottom: '10px',
  },
}

const Filter = ({
  filter,           //各种参数，可包含请求的参数，作为搜索栏的填充默认值
  createHandle,     //新增的请求方法
  sortHandler,      //排序的请求方法
  createText,       //新增的请求的方法
  onFilterChange,   //点击搜索或回车后触发的请求事件
  options,          //搜索框的请求类型选择
  width,            //搜索框的请求类型选择的宽度
  queryListData,    //请求表格数据的方法
  fileName,         //这个。。。自个看把
  columns,          
  form: {
    getFieldDecorator,
    getFieldsValue,
  },
}) => {
  const defaultType = options[0].key
  const { search_type =  defaultType, keyword } = filter
  const selectWidth = width || 100;
  const typeSelector = getFieldDecorator('search_type', {
    initialValue: search_type,
  })(
    <Select style={{width: selectWidth}}>
      {
        options.map(item => {
          return <Option value={item.key} key={item.key}>{item.value}</Option>
        })
      }
    </Select>
  );

  const onSearch = () => {
    let fields = getFieldsValue()
    if(!fields.keyword) {
      fields.search_type = undefined
      fields.keyword = undefined
    }
    onFilterChange(fields)
  }

   // 导出表格
   const download = () => {
    return new Promise(resolve => {
      const newFilter = {
        ...filter,
        page:1,
        list_rows: 100000,
      };
      queryListData(newFilter).then(res => {
        if (res.success) {
          resolve(res.Data);
        }
      });
    });
  };

  return (
    <Form>
      <Row gutter={24}>
        {
          createHandle ? (
            <Col {...ColProps} xxl={{ span: sortHandler ? 4 : 2 }} xl={{ span: sortHandler ? 4 : 3 }}>
              <FormItem {...formItemStyle}>
                <Button type="ghost" onClick={createHandle}>{createText || '新增'}</Button>
                {
                  sortHandler ? (
                    <Button type="primary" onClick={sortHandler} style={{marginLeft: 10}}>排序</Button>
                  ) : null
                }
              </FormItem>
            </Col>
          ) : null
        }
        <Col {...ColProps} xl={{ span: 10 }}>
          <FormItem {...formItemStyle}>
            {getFieldDecorator('keyword', {
              initialValue: keyword,
            })(
              <Search
                placeholder="关键词"
                addonBefore={typeSelector}
                enterButton="搜索"
                onSearch={onSearch}
              />
            )}
          </FormItem>
        </Col>
        {columns ? (
          <Col {...ColProps} xl={{ span: 3 }}>
            <FormItem {...formItemStyle}>
              <Writexlsx
                download={download}
                fileName={fileName}
                columns={columns}
              />
            </FormItem>
          </Col>
        ) : null}
      </Row>
    </Form>
  )
}

Filter.propTypes = {
  
}

export default Form.create()(Filter)
