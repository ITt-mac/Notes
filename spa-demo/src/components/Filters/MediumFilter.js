import React from "react";
import {
  Form,
  Button,
  Row,
  Col,
  Input,
  Select,
  DatePicker,
  Cascader,
} from "antd";
import moment from "moment";
import citys from "utils/city";
import Writexlsx from '../Writexlsx'

const Option = Select.Option;
const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;

const ColProps = {
  xs: 24,
  sm: 12,
};

const formItemStyle = {
  style: {
    marginBottom: "10px",
  },
};

const Filter = ({
  onFilterChange,
  filter,
  options,
  datePlaceHolder,
  hasArea,
  form: { getFieldDecorator, getFieldsValue, setFieldsValue },
  queryListData,
  fileName,
  columns,
}) => {
  const defaultType = options.length ? options[0].key : "";
  const initialCreateTime = [];
  const initialArea = [];
  let {
    search_type = defaultType,
    keyword,
    s_time,
    e_time,
    province,
    city,
    area,
  } = filter;
  const handleFields = fields => {
    const { time, areaData } = fields;
    if (time && time.length) {
      fields.s_time = time[0].format("YYYY-MM-DD");
      fields.e_time = time[1].format("YYYY-MM-DD");
      delete fields.time;
    } else {
      fields.s_time = undefined;
      fields.e_time = undefined;
    }
    if (areaData && areaData.length) {
      fields.province = areaData[0];
      fields.city = areaData[1];
      fields.area = areaData[2];
      delete fields.areaData;
    } else {
      fields.province = undefined;
      fields.city = undefined;
      fields.area = undefined;
    }
    return fields;
  };

  const handleSubmit = () => {
    let fields = getFieldsValue();
    fields = handleFields(fields);
    onFilterChange(fields);
  };

  const handleReset = () => {
    const fields = getFieldsValue();
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = [];
        } else {
          fields[item] = undefined;
        }
      }
    }

    setFieldsValue(fields);
    handleSubmit();
    setFieldsValue({
      search_type: search_type,
    });
  };

  if (s_time) {
    initialCreateTime[0] = moment(s_time);
  }
  if (e_time) {
    initialCreateTime[1] = moment(e_time);
  }
  if (province) {
    initialArea[0] = province;
  }
  if (city) {
    initialArea[1] = city;
  }
  if (area) {
    initialArea[2] = area;
  }

  const typeSelector = getFieldDecorator("search_type", {
    initialValue: search_type,
  })(
    <Select style={{ width: 100 }}>
      {options.map(item => {
        return (
          <Option value={item.key} key={item.key}>
            {item.value}
          </Option>
        );
      })}
    </Select>
  );

  // 导出表格
  const download = () => {
    return new Promise(resolve => {
      const newFilter = {
        ...filter,
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
      <Row
        gutter={10}
        style={{ marginBottom: "15px" }}
        type="flex"
        justify="start">
        {options.length ? (
          <Col>
            <FormItem {...formItemStyle}>
              {getFieldDecorator("keyword", {
                initialValue: keyword,
              })(
                <Input
                  addonBefore={typeSelector}
                  style={{ width: "300px" }}
                  placeholder="关键词"
                />
              )}
            </FormItem>
          </Col>
        ) : null}
        <Col>
          {hasArea ? (
            <FormItem {...formItemStyle}>
              {getFieldDecorator("areaData", {
                initialValue: initialArea,
              })(
                <Cascader
                  options={citys}
                  changeOnSelect
                  style={{ width: "300px" }}
                  placeholder="地区选择"
                />
              )}
            </FormItem>
          ) : (
            <FormItem {...formItemStyle}>
              {getFieldDecorator("time", {
                initialValue: initialCreateTime,
              })(
                <RangePicker
                  placeholder={datePlaceHolder || ["开始日期", "结束日期"]}
                />
              )}
            </FormItem>
          )}
        </Col>
        <Col>
          <FormItem {...formItemStyle}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}>
              <div>
                <Button
                  type="primary"
                  className="margin-right"
                  onClick={handleSubmit}>
                  搜索
                </Button>
                <Button onClick={handleReset}>重置</Button>
              </div>
            </div>
          </FormItem>
        </Col>
        {columns ? (
          <Col>
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
  );
};

Filter.propTypes = {};

export default Form.create()(Filter);
