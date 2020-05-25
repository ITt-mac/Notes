import React from 'react'
import {Button, Icon } from 'antd'
import {withRouter} from 'react-router-dom'
const goBack = (props)=>{
  props.history.goBack();
}
const ReturnBtn = (props) => {
  return (
    <Button onClick={()=>{goBack(props)}}>
      <Icon style={{ marginRight: 2 }} type="left" />
      返回
    </Button>
  )
}


export default withRouter(ReturnBtn)
