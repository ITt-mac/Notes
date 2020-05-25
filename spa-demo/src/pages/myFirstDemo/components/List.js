import React from 'react';
import PropTypes from 'prop-types';
import { Table, Popconfirm } from 'antd';
import AnimTableBody from 'components/DataTable/AnimTableBody';
import { listOnChangeCreator, filteredValueCreator } from 'utils';
import styles from './List.less';

const List = ({
  onDeleteItem,
  onEditItem,
  location,
  handleRefresh,
  permission,
  ...tableProps
}) => {
  const { query } = location;
/*  这里需要讲得一点就是，表格里的交互如升降序，筛选，分页切换（后端分页），
 都是通过表格的onChange来最终获取查询条件，最后通过location地址栏的变化来刷新页面内容。
 dispatch一个routerRedux的请求，实现查询条件收集，然后通过model的subscriptions，
 触发里面的监听history,最后去后端请求数据。 */
  const onChange = listOnChangeCreator(handleRefresh); //生成列表筛选方法

  const typeMap = {
    product: '产品',
    service: '服务',
  };

  const columns = [
    {
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      sorter:true
    },
    {
      title: '编码',
      dataIndex: 'code',
      key: 'code',
      width: 150,
      sorter:true
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      width: 200,
    },
    {
      title: '内容',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: '类型',
      dataIndex: 'type',
      filters: [
        { text: '产品', value: 'product' },
        { text: '服务', value: 'service' },
      ],
      filteredValue: filteredValueCreator(query.type),
      key: 'type',
      width: 130,
      render: text => typeMap[text],
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
      width: 200,
    },
    {
      title: '最后修改时间',
      dataIndex: 'modified_time',
      key: 'modified_time',
      width: 200,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      filters: [{ text: '启用', value: '1' }, { text: '禁用', value: '0' }],
      filteredValue: filteredValueCreator(query.status),
      render: text => {
        return text === 1 ? (
          <span style={{ color: 'green' }}>启用</span>
        ) : (
          <span style={{ color: 'red' }}>禁用</span>
        );
      },
      width: 120,
    },
    {
      title: '操作',
      key: 'operation',
      width: 120,
      fixed: 'right',
      render: (text, record) => {
        return (
          <React.Fragment>
              <a
                style={{ marginRight: 10 }}
                onClick={() => onEditItem(record)}>
                编辑
              </a>
              <Popconfirm
                title={`是否确认删除该模板？`}
                placement="left"
                onConfirm={() => onDeleteItem(record)}>
                <a style={{ marginLeft: 8 }}>删除</a>
              </Popconfirm>
          </React.Fragment>
        );
      },
    },
  ];
  const AnimateBody = props => {
    return <AnimTableBody {...props} />;
  };

  return (
    <Table
      {...tableProps}
      className={styles.table}
      scroll={{ x: 1550 }}
      columns={columns}
      onChange={onChange}
      simple
      rowKey={record => record.id}
      components={{
        body: AnimateBody,
      }}
    />
  );
};
List.propTypes = {
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
};
export default List;
