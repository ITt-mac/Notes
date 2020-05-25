const Mock = require('mockjs')
const { config } = require('./common')

const APIV2 = config.APIV2

const productList = [
  {
    id: 1,
    type: 'master',
    name: 'hcf云业务管理系统国内版',
    desc: '购买： ￥30000.00个/年',
    status: true,
  },
  {
    id: 2,
    type: 'master',
    name: 'hcf云业务管理系统国内版',
    desc: '购买： ￥30000.00个/年',
    status: true,
  },
  {
    id: 22,
    type: 'master',
    name: 'hcf云业务管理系统国内版',
    desc: '购买： ￥30000.00个/年',
    status: true,
  },
  {
    id: 23,
    type: 'master',
    name: 'hcf云业务管理系统国内版',
    desc: '购买： ￥30000.00个/年',
    status: true,
  },
  {
    id: 3,
    type: 'guard',
    name: 'hcf云业务管理系统国内版',
    desc: '购买： ￥30000.00个/年',
    status: false,
  },
  {
    id: 4,
    type: 'guard',
    name: 'hcf云业务管理系统国内版',
    desc: '购买： ￥30000.00个/年',
    status: true,
  },
  {
    id: 33,
    type: 'guard',
    name: 'hcf云业务管理系统国内版',
    desc: '购买： ￥30000.00个/年',
    status: true,
  },
  {
    id: 5,
    type: 'api',
    name: 'hcf云业务管理系统国内版',
    desc: '购买： ￥30000.00个/年',
    status: false,
  },
  {
    id: 6,
    type: 'api',
    name: 'hcf云业务管理系统国内版',
    desc: '购买： ￥30000.00个/年',
    status: true,
  },
  {
    id: 61,
    type: 'api',
    name: 'hcf云业务管理系统国内版',
    desc: '购买： ￥30000.00个/年',
    status: true,
  },
  {
    id: 62,
    type: 'api',
    name: 'hcf云业务管理系统国内版',
    desc: '购买： ￥30000.00个/年',
    status: true,
  },
]

const masterList = Mock.mock({
  'data|80-100': [
    {
      'id|+1': 1,
      'user_id|11-99': 1,
      name: '@last',
      bind_domain: '@name',
      'status|1-5': 3,
      end_time: '@datetime',
      create_time: '@datetime',
      code: '@name',
      remarks: '@name',
      'total_times|10-200': 1,
      'last_times|10-200': 1,
    },
  ],
})

module.exports = {

  [`GET ${APIV2}/product/list`] (req, res) {
    res.status(200).json(Object.assign({}, config.successJson, {
      list: {
        data: productList,
        master: 4,
        guard: 3,
        api: 4,
      },
    }))
  },

  [`GET ${APIV2}/product_master_list`] (req, res) {
    res.status(200).json(Object.assign({}, config.successJson, {
      list: masterList.data,
    }))
  },

  [`GET ${APIV2}/product_master_list/:id`] (req, res) {
    const { id } = req.params
    const product = masterList.data.filter(item => item.id == id)
    res.json(Object.assign({}, config.successJson, {
      data: product[0],
    }))
  },

  [`POST ${APIV2}/product_master_list/authorize`] (req, res) {
    setTimeout(() => {
      res.status(200).json(Object.assign({}, config.successJson, {
        Message: '操作成功！',
      }))
    }, 2000);
  },

  [`POST ${APIV2}/product_master_list/renew`] (req, res) {
    setTimeout(() => {
      res.status(200).json(Object.assign({}, config.successJson, {
        Message: '操作成功！',
      }))
    }, 2000);
  },

  [`POST ${APIV2}/product_master_list/refund`] (req, res) {
    setTimeout(() => {
      res.status(200).json(Object.assign({}, config.successJson, {
        Message: '操作成功！',
      }))
    }, 2000);
  },

  [`POST ${APIV2}/product_master_list/remove`] (req, res) {
    setTimeout(() => {
      res.status(200).json(Object.assign({}, config.successJson, {
        Message: '操作成功！',
      }))
    }, 2000);
  },

  [`GET ${APIV2}/product_guard_list`] (req, res) {
    res.status(200).json(Object.assign({}, config.successJson, {
      list: masterList.data,
    }))
  },

  [`GET ${APIV2}/product_guard_list/:id`] (req, res) {
    const { id } = req.params
    const product = masterList.data.filter(item => item.id == id)
    res.json(Object.assign({}, config.successJson, {
      data: product[0],
    }))
  },

  [`POST ${APIV2}/product_guard_list/authorize`] (req, res) {
    setTimeout(() => {
      res.status(200).json(Object.assign({}, config.successJson, {
        Message: '操作成功！',
      }))
    }, 2000);
  },

  [`POST ${APIV2}/product_guard_list/renew`] (req, res) {
    setTimeout(() => {
      res.status(200).json(Object.assign({}, config.successJson, {
        Message: '操作成功！',
      }))
    }, 2000);
  },

  [`POST ${APIV2}/product_guard_list/refund`] (req, res) {
    setTimeout(() => {
      res.status(200).json(Object.assign({}, config.successJson, {
        Message: '操作成功！',
      }))
    }, 2000);
  },

  [`POST ${APIV2}/product_guard_list/remove`] (req, res) {
    setTimeout(() => {
      res.status(200).json(Object.assign({}, config.successJson, {
        Message: '操作成功！',
      }))
    }, 2000);
  },

  [`GET ${APIV2}/product_guard_list/:id`] (req, res) {
    const { id } = req.params
    const product = masterList.data.filter(item => item.id == id)
    res.json(Object.assign({}, config.successJson, {
      data: product[0],
    }))
  },

  [`GET ${APIV2}/product_api_list`] (req, res) {
    res.status(200).json(Object.assign({}, config.successJson, {
      list: masterList.data,
    }))
  },

  [`GET ${APIV2}/product_api_list/:id`] (req, res) {
    const { id } = req.params
    const product = masterList.data.filter(item => item.id == id)
    res.json(Object.assign({}, config.successJson, {
      data: product[0],
    }))
  },

  [`POST ${APIV2}/product_save/type/master`] (req, res) {
    const { id } = req.body
    let Message = '保存成功'
    if(id) {
      Message = '修改成功'
    }
    setTimeout(() => {
      res.status(200).json(Object.assign({}, config.successJson, {
        Message,
      }))
    }, 2000);
  },

  [`POST ${APIV2}/product_save/type/guard`] (req, res) {
    const { id } = req.body
    let Message = '保存成功'
    if(id) {
      Message = '修改成功'
    }
    setTimeout(() => {
      res.status(200).json(Object.assign({}, config.successJson, {
        Message,
      }))
    }, 2000);
  },

  [`POST ${APIV2}/product_save/type/api`] (req, res) {
    const { id } = req.body
    let Message = '保存成功'
    if(id) {
      Message = '修改成功'
    }
    setTimeout(() => {
      res.status(200).json(Object.assign({}, config.successJson, {
        Message,
      }))
    }, 2000);
  },

  [`POST ${APIV2}/product/delete`] (req, res) {
    setTimeout(() => {
      res.status(200).json(Object.assign({}, config.successJson, {
        Message: "删除成功",
      }))
    }, 2000)
  },
}
