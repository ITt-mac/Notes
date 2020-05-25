const Mock = require('mockjs')
const config = require('../src/utils/config')
const cloneDeep = require('lodash.clonedeep')
const qs = require('qs');

const { successJson, errorJson, apiPrefix } = config
let basicInitObj = {
    website: '青春野狼系列',
    title:'樱岛麻衣与拉普拉斯的魔女',
    keyword:'由比滨结衣',
    instroduce:'有的没的',
    indexLogo:'有的没的',
    domain:'有的没的',
    close:true,
    icp:'备@野狼',
    copyright: '青春',
    code:'console.log("麻衣酱daisiki")',
}

module.exports = {

    [`GET /setting/basic/initData`] (req, res) {
        const success = cloneDeep(successJson)
        res.status(200).json(Object.assign(success,{data:basicInitObj} ))
    },
    [`POST /setting/basic`] (req, res) {
        console.log(req)
        const newData = qs.parse(req.body);
        basicInitObj = Object.assign(basicInitObj,newData);
        const success = cloneDeep(successJson)
        success.Message="修改成功";
        res.status(200).json(Object.assign(success,{data:basicInitObj} ))
    },

}
