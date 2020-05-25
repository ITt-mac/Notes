/* global document */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FilterItem } from 'components';
import {
  Form,
  Button,
  Icon,
  Row,
  Col,
  DatePicker,
  Input,
  Cascader,
  Switch,
  Select,
} from 'antd';

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;
const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
};
const TwoColProps = {
  ...ColProps,
  xl: 96,
};

const Filter = ({
  onAdd,
  isMotion,
  onFilterChange, // submit操作的回调,重置按钮最后也是走的这个借口
  filter,
  form: {
    // form来源自 Filter导出之前被 Form.create()(Filter)增强之后,给Filter增加了form属性
    getFieldDecorator, // 用来对表单元素在form中进行注册操作
    getFieldsValue, // 获取所有注册过的表单的值
    setFieldsValue, // 设置 通过getFieldDecorator注册过的值
  },
  otherSelection = [],
}) => {
  const handleFields = fields => {
    const { time } = fields;
    if (time && time.length) {
      fields.s_time = time[0].format('YYYY-MM-DD');
      fields.e_time = time[1].format('YYYY-MM-DD');
      delete fields.time;
    } else {
      fields.s_time = undefined;
      fields.e_time = undefined;
    }
    return fields;
  };
  const handleSubmit = () => {
    // 查询操作
    let fields = getFieldsValue(); // 获取所有的 通过getFieldDecorator 注册的值 一个对象key为对应注册的name
    fields = handleFields(fields); // 将fields数据中的create_time(时间)数据进行处理,处理成为需要的格式
    onFilterChange(fields); // 将获取到的fields作为参数传递给onFilterChange回调函数
  };
  const handleReset = () => {
    // 对重置按钮点击的处理函数
    const fields = getFieldsValue();
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        // 对fields数据进行处理,只重置它自己的属性,而不处理它原型链上的属性
        if (fields[item] instanceof Array) {
          fields[item] = [];
        } else {
          fields[item] = undefined;
        }
      }
    }
    setFieldsValue(fields); // 重置表单的值
    handleSubmit(); // 重置
  };
  const handleChange = (key, values) => {
    // 用来处理一些表单的数据改变,当数据改变时,手动更改提交数据,最后调用查询借口(onFilterChange)
    let fields = getFieldsValue();
    fields[key] = values;
    fields = handleFields(fields);
    onFilterChange(fields);
  };

  const { searchType, keyword, create_time } = filter;

  let initialCreateTime = []; // 设置初始化时间的数组 (主要是输入的时间格式可能不同,为了统一处理)
  if (create_time && create_time[0]) {
    // 当通过filter传入了初始时间时,通过moment将初始时间转换
    initialCreateTime[0] = moment(create_time[0]);
  }
  if (create_time && create_time[1]) {
    initialCreateTime[1] = moment(create_time[1]);
  }

  return (
    <Row
      gutter={10}
      style={{ marginBottom: '15px' }}
      type="flex"
      justify="start">
      <Col>
        <FilterItem label="搜索">
          {getFieldDecorator('searchType', {
            initialValue: searchType,
          })(
            <Select placeholder="搜索条件" style={{ width: '100px' }}>
              <Option value="admin_id">管理员ID</Option>
              <Option value="title">标题</Option>
            </Select>
          )}
        </FilterItem>
      </Col>
      <Col>
        <FilterItem>
          {getFieldDecorator('keyword', {
            initialValue: keyword,
          })(<Input placeholder="关键词" />)}
        </FilterItem>
      </Col>
      <Col id="createTimeRangePicker">
        <FilterItem>
          {getFieldDecorator('time', {
            initialValue: initialCreateTime,
          })(
            <RangePicker
              style={{ width: '230px' }}
              placeholder={['开始时间 ', '结束时间']}
              onChange={handleChange.bind(null, 'time')}
              getCalendarContainer={() => {
                return document.getElementById('createTimeRangePicker');
              }}
            />
          )}
        </FilterItem>
      </Col>
      {otherSelection &&
        otherSelection.map((val, key) => (
          <Col key={key}>
            <FilterItem label={val.title}>
              {getFieldDecorator(val.name, {
                initialValue: filter[val.name],
              })(
                <Select
                  placeholder={val.placeholder}
                  style={{ width: '100px' }}
                  dropdownMatchSelectWidth={false}>
                  {val.options.map(option => (
                    <Option key={option.id}>{option.title}</Option>
                  ))}
                </Select>
              )}
            </FilterItem>
          </Col>
        ))}
      <Col>
        <Button type="primary" className="margin-right" onClick={handleSubmit}>
          搜索
        </Button>
        <Button onClick={handleReset}>重置</Button>
      </Col>
    </Row>
  );
};

Filter.propsTypes = {
  // 过滤器属性校验
  onAdd: PropTypes.func, // onAdd为函数
  isMotion: PropTypes.bool, // isMotion为布尔值
  form: PropTypes.object, // form为对象
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
  otherSelection: PropTypes.array,
};
export default Form.create()(Filter);
