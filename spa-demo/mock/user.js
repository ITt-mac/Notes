const Mock = require('mockjs')
const config = require('../src/utils/config')

const { successJson, errorJson } = config

const { APIV2 } = config

let usersListData = Mock.mock({
  'data|80-100': [
    {
      id: '@id',
      name: '@name',
      nickName: '@last',
      phone: /^1[34578]\d{9}$/,
      'age|11-99': 1,
      address: '@county(true)',
      isMale: '@boolean',
      email: '@email',
      createTime: '@datetime',
      avatar () {
        return Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', this.nickName.substr(0, 1))
      },
    },
  ],
})


let database = usersListData.data

const EnumRoleType = {
  ADMIN: 'admin',
  DEFAULT: 'guest',
  DEVELOPER: 'developer',
}

const userPermission = {
  DEFAULT: {
    visit: ['1', '2', '21'],
    role: EnumRoleType.DEFAULT,
  },
  ADMIN: {
    role: EnumRoleType.ADMIN,
  },
  DEVELOPER: {
    role: EnumRoleType.DEVELOPER,
  },
}

const adminUsers = [
  {
    id: 0,
    username: 'admin',
    password: 'admin',
    permissions: userPermission.ADMIN,
    token: 'suisnfhfnfhfndhfndhfnf1',
  }, {
    id: 1,
    username: 'guest',
    password: 'guest',
    permissions: userPermission.DEFAULT,
    token: 'suisnfhfnfhfndhfndhfnf2',
  }, {
    id: 2,
    username: '吴彦祖',
    password: '123456',
    permissions: userPermission.DEVELOPER,
    token: 'suisnfhfnfhfndhfndhfnf3',
  }, {
    id: 3,
    username: '专属',
    password: '123456',
    permissions: userPermission.ADMIN,
    token: 'suisnfhfnfhfndhfndhfnf4',
  },
]

const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  let data

  for (let item of array) {
    if (item[keyAlias] === key) {
      data = item
      break
    }
  }

  if (data) {
    return data
  }
  return null
}

const NOTFOUND = {
  message: 'Not Found',
  documentation_url: 'http://localhost:8000/request',
}

module.exports = {

  [`POST ${APIV2}/login`] (req, res) {
    const { username, password } = req.body
    const user = adminUsers.filter(item => item.username === username)
    if (user.length && user[0].password === password) {
      res.json(Object.assign({}, successJson, {
        user: user[0],
      }))
    } else {
      res.status(200).json(Object.assign(errorJson, {
        Message: '帐号密码不存在!',
      }))
    }
  },

  [`GET ${APIV2}/user/logout`] (req, res) {
    res.json(Object.assign({}, successJson, {
      Message: '退出成功!',
    }))
  },

  [`GET ${APIV2}/admin_info`] (req, res) {
    const headers = req.headers
    const token = headers['token']
    if(token) {
      const user = adminUsers.filter(item => item.token === token)
      if(user.length) {
        res.json(Object.assign({}, successJson, {
          user: user[0],
        }))
      }else {
        res.status(200).json(Object.assign({}, errorJson, {
          Message: 'TOKEN错误',
        }))
      }
    }else {
      res.status(200).json(Object.assign({}, errorJson, {
        Message: '登录已失效，请重新登录!',
      }))
    }
  },

  [`GET ${APIV2}/users`] (req, res) {
    const { query } = req
    let { list_rows, page, ...other } = query
    list_rows = list_rows || 10
    page = page || 1

    const headers = req.headers
    const token = headers['token']

    if(token) {
      const user = adminUsers.filter(item => item.token === token)
      if(user.length) {
        let newData = database
        for (let key in other) {
          if ({}.hasOwnProperty.call(other, key)) {
            newData = newData.filter((item) => {
              if ({}.hasOwnProperty.call(item, key)) {
                if (key === 'address') {
                  return other[key].every(iitem => item[key].indexOf(iitem) > -1)
                } else if (key === 'createTime') {
                  const start = new Date(other[key][0]).getTime()
                  const end = new Date(other[key][1]).getTime()
                  const now = new Date(item[key]).getTime()

                  if (start && end) {
                    return now >= start && now <= end
                  }
                  return true
                }
                return String(item[key]).trim().indexOf(decodeURI(other[key]).trim()) > -1
              }
              return true
            })
          }
        }
        res.json(Object.assign({}, successJson, {
          data: newData.slice((page - 1) * list_rows, page * list_rows),
          total: newData.length,
        }))
      }else {
        res.status(200).json(Object.assign({}, errorJson, {
          Message: 'TOKEN错误',
        }))
      }
    }else {
      res.status(200).json(Object.assign({}, errorJson, {
        Message: '登录已失效，请重新登录!',
      }))
    }
  },

  [`POST ${APIV2}/users/delete`] (req, res) {
    const { ids } = req.body
    database = database.filter(item => !ids.some(_ => _ === item.id))
    res.status(204).end()
  },


  [`POST ${APIV2}/user`] (req, res) {
    const newData = req.body
    newData.createTime = Mock.mock('@now')
    newData.avatar = newData.avatar || Mock.Random.image('100x100', Mock.Random.color(), '#757575', 'png', newData.nickName.substr(0, 1))
    newData.id = Mock.mock('@id')

    database.unshift(newData)

    res.status(200).end()
  },

  [`GET ${APIV2}/user/:id`] (req, res) {
    const newData = {
      username: '張無忌',
      age: 26,
      id: 2333,
      money: '43.96',
      mobile: '13800009999',
      company: '光明顶',
      status: 1, // 1正常 0 禁用
      score: 7777,
      remarks: '在开始之前，推荐先学习 React 和 ES2015，并正确安装和配置了 Node.js v8 或以上。 官方指南假设你已了解关于 HTML、CSS 和 JavaScript 的中级知识，并且已经完全掌握了 React 全家桶的正确开发方式。如果你刚开始学习前端或者 React，将 UI 框架作为你的第一步可能不是最好的主意。',
      logs: [
        {
          operate: '开机',
          time: '2018-10-24 18:00:00',
          id: 2,
        },
        {
          operate: '关机',
          time: '2018-10-24 18:30:00',
          id: 4,
        },
      ],
    }
    res.json(Object.assign({}, successJson, {
      data: newData,
    }))
  },

  [`DELETE ${APIV2}/user/:id`] (req, res) {
    const { id } = req.params
    const data = queryArray(database, id, 'id')
    if (data) {
      database = database.filter(item => item.id !== id)
      res.status(204).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },

  [`PATCH ${APIV2}/user/:id`] (req, res) {
    const { id } = req.params
    const editItem = req.body
    let isExist = false

    database = database.map((item) => {
      if (item.id === id) {
        isExist = true
        return Object.assign({}, item, editItem)
      }
      return item
    })

    if (isExist) {
      res.status(201).end()
    } else {
      res.status(404).json(NOTFOUND)
    }
  },
}
