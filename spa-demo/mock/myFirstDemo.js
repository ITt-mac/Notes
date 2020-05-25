const Mock = require('mockjs');
const config = require('../src/utils/config')
const { APIV2 } = config;

let myFirstDemo=Mock.mock({
    'data|80-100':[
        {
            'id|+1':1,
            code:'@guid',
            title:'@title',
            content:'@sentence',
            'type|+1': ['product','service'],
            create_time: '@datetime',
            modified_time: '@datetime',
            'status|0-1': 1,
        },
    ]
})

module.exports={
    // 分页查询接口
    [`GET ${APIV2}/myFirstDemo/List`](req,res){
        const {query}=req;
        // console.log(req.query)
        let { list_rows = 10, page = 1, ...other } = query;
        let newData=myFirstDemo.data;
        res.json(Object.assign(
            {}, 
            {
                Message: '操作成功',
            },
            {
                Code:'Success'
            },
            {
                data:newData.slice((page - 1) * list_rows, page * list_rows),
                total:newData.length
            }
            ))
    },
}