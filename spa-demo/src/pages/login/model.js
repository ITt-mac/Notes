import { routerRedux } from 'dva/router'
import { login } from './service'
import { setItem, hcf_TOKEN, config } from '../../utils'

const imgUrl = config.verifyImg + '/captcha?key=admin_login_captcha'

export default {
  namespace: 'login',

  state: {
    verifyImg: imgUrl,
  },

  effects: {
    * login ({
      payload,
    }, { put, call, select }) {
      yield put(routerRedux.push('/dashboard'))
      // const data = yield call(login, payload)
      // const { locationQuery } = yield select(_ => _.app)//这里是获取models/app.js下的model
      // if (data.success) {
      //   setItem(hcf_TOKEN, data.Data.token)
      //   const { from } = locationQuery
      //   yield put({ type: 'app/query' })
      //   if (from && from !== '/login') {
      //     yield put(routerRedux.push(from))
      //   } else {
      //     yield put(routerRedux.push('/dashboard'))
      //   }
      // }else {
      //   yield put({ type: 'changeVerify' })
      // }
    },
  },
  reducers: {
    changeVerify (state) {
      return {
        ...state,
        verifyImg: `${imgUrl}&v=${+ new Date()}`,
      }
    },
  },
}
