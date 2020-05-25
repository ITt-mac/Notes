const Mock = require('mockjs')
const config = require('../src/utils/config')
const {successJson, errorJson, APIV2} = config

let orderListData = Mock.mock({
    'data|80-100' : [
        {
            id:'@id',
            user_id: '@id',
            'number|+1': 100000,
            'status|1-3': 1,
            'amount|1-2000.2': 1,
            'payment|1-2000.2': 1,
            'discount|1-2000.2': 1,
            discount_info: '@string("lower", 10)',
            pay_time: '@datetime',
            create_time: '@datetime',
            modified_time: '@datetime',
        },
    ],
})
let orderDetailData = Mock.mock({
    'data|80-100' : [
        {
            id:'@id',
            user_id: '@id',
            'number|+1': 100000,
            'type|+1': ['product','service'],
            'sub_type|+1': ['product_buy','product_renew','service_buy'],
            'num|1-20': 20,
            'title': '@cword(3)',
            'price|10-20': 1,
            'status|1-3': 1,
            'is_refund|0-1': 1,
            'is_invoice|0-1': 1,
            'amount|1-2000.2': 1,
            'payment|1-2000.2': 1,
            'discount|1-2000.2': 1,
            discount_info: '@string("lower", 10)',
            pay_time: '@datetime',
            create_time: '@datetime',
            modified_time: '@datetime',
            'assoc_id|+1': 100000,
            //属性
            'order_item_id': '@id',
        },
    ],
})
let database = orderListData.data
let detailDatabase = orderDetailData.data

module.exports = {
    [`GET ${APIV2}/finance/order`] (req,res) {
        const {query} = req
        let { list_rows = 10, page = 1, ...other } = query
        const headers = req.headers
        let newData = database
        // for (let key in other) {
        //     if({}.hasOwnProperty.call(other,key)){
        //         newData = newData.filter((item)=>{
        //             if({}.hasOwnProperty.call(item,key)){
        //                 if(key === '')
        //             }
        //         })
        //     }
        // }
        res.json(Object.assign({}, successJson, {
            data: {
                data:newData.slice((page - 1) * list_rows, page * list_rows),
                total: newData.length,
            },
        }))
    },
    [`GET ${APIV2}/finance/order/:id`] (req, res) {
        const { id } = req.params
        const newData = database[0]
       
        res.json(Object.assign({}, successJson, {
            data: {
                ...newData,
                data:detailDatabase,
                total: detailDatabase.length,
            },
        }))
    },
    [`GET ${APIV2}/finance/order/childDetail/:id`] (req, res) {
        const { id } = req.query
        const newData = detailDatabase.find(val=>val.id === parseInt(id))
       
        res.json(Object.assign({}, successJson, {
            data: newData,
        }))
    },
    [`POST ${APIV2}/finance/order/refund`] (req, res) {
        try{
            const { id } = req.body
            console.log(req)

            var dataItem = detailDatabase.find(val=>val.id === parseInt(id))
            if(dataItem){
                dataItem.is_refund = 2;
                res.json(Object.assign({}, successJson, {
                    Message: '操作成功',
                }))
            }else{
                res.json(Object.assign({}, errorJson, {
                    data:dataItem,
                    Message: '操作失败,没有对应的订单',
                }))
            }
        }catch(e){
            console.log(e)
        }
    },
}