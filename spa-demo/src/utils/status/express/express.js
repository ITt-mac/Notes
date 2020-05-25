import { Tag } from "antd";
export const statusMap = {
    '0': {
      text: '在途',
      color: 'red',
    },
    '1': {
      text: '揽件',
      color: 'blue',
    },
    '2': {
      text: '疑难',
      color: 'orange',
    },
    '3': {
      text: '签收',
      color: 'green',
    },
    '4': {
      text: '退签',
      color: 'gray',
    },
    '5': {
      text: '派件',
      color: 'green',
    },
    '6': {
      text: '退回',
      color: 'black',
    },
  }

export const statusOrNo = status => {
    if (status == 1) {
      return <Tag color="#87d068">查询成功</Tag>;
    }
    return <Tag color="#f50">查询失败</Tag>;
};

export const resultStatusMap = {
  '1': {
    value: 1,
    text: '人工确认',
    className: 'globalStatusBlue',
  },
  '2': {
    text: '可收派',
    className: 'globalStatusGreen',
  },
  '3': {
    text: '不可以收派',
    className: 'globalStatusRed',
  },
}

export const cancelStatusMap = {
  '0': {
    value: 0,
    text: '未取消',
    className: 'globalStatusGreen',
  },
  '1': {
    text: '已取消',
    className: 'globalStatusGray',
  },

}
