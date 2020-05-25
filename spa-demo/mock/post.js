const { config, posts } = require('./common')

const { APIV2 } = config
let database = posts

module.exports = {

  [`GET ${APIV2}/posts`] (req, res) {
    const { query } = req
    let { list_rows, page, ...other } = query
    list_rows = list_rows || 10
    page = page || 1

    let newData = database
    for (let key in other) {
      if ({}.hasOwnProperty.call(other, key)) {
        newData = newData.filter((item) => {
          if ({}.hasOwnProperty.call(item, key)) {
            return String(item[key]).trim().indexOf(decodeURI(other[key]).trim()) > -1
          }
          return true
        })
      }
    }

    res.status(200).json({
      data: newData.slice((page - 1) * list_rows, page * list_rows),
      total: newData.length,
    })
  },
}
