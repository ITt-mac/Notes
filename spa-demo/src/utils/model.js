import modelExtend from 'dva-model-extend';

export const model = {
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export const pageModel = modelExtend(model, {
  state: {
    list: [],
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条`,
      current: 1,
      total: 0,
      list_rows: 10,
      pageSize: 10,
      pageSizeOptions: ['10', '20', '30', '50', '100'],
    },
    permission: {
      create: { is: 0 },
      delete: { is: 0 },
      edit: { is: 0 },
      view: { is: 0 },
      detail: { is: 0 },
      role_setting: { is: 0 },
    },
  },

  reducers: {
    querySuccess(state, { payload }) {
      const { list, pagination, permission = {} } = payload;
      return {
        ...state,
        list,
        pagination: {
          ...state.pagination,
          ...pagination,
          pageSize: pagination.list_rows,
        },
        permission: {
          ...state.permission,
          ...permission,
        },
      };
    },
  },
});
