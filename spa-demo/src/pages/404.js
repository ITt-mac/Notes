import React from 'react'
import { Icon } from 'antd'
import { Page } from 'components'
import styles from './404.less'
import img_404 from './404.jpg'

const Error = () => (<Page inner>
  <div className={styles.error}>
    {/* <Icon type="frown-o" /> */}
    {/* <h1>404 Not Found</h1> */}
    <img src={img_404} ></img>
  </div>
</Page>)

export default Error
