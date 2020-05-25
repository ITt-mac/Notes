import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'dva';
import {Button} from 'antd';
import {Page} from 'components';
import Sort from '@/components/Sort';
import List from './components/List';
import Modal from './components/EditModal';
import {sortDataFormat, handleRefreshCreator} from 'utils';
const NAMESPACE = 'templatemanage';

const PageCom = props => {
  const {location, dispatch, modelState, loading} = props;
  const handleRefresh = handleRefreshCreator(location, dispatch); // 生成筛选页面方法 可以用于filter筛选和列表筛选
  const {
    list,
    currentItem,
    modalVisible,
    modalType,
    contentLength,
    pagination,
    permission,
    sortVisible,
  } = modelState;


  const listProps = {
    dataSource: list,
    loading,
    location,
    pagination: false,
    permission,
    handleRefresh,
    onDeleteItem(id) {
      dispatch({
        type: `${NAMESPACE}/delete`,
        payload: id,
      }).then(() => {
        handleRefresh({});
      });
    },
    onEditItem(item) {
      dispatch({
        type: `${NAMESPACE}/showModal`,
        payload: {
          modalType: 'edit',
          currentItem: {
            ...item,
            modalType: 'edit',
          },
        },
      });

      dispatch({
        type: `${NAMESPACE}/updateState`,
        payload: {contentLength: item.content.length},
      });
    },
  };

  // 获取添加或者编辑弹窗的字数统计
  const handleContentWordsLengthChange = value => {
    dispatch({
      type: `${NAMESPACE}/updateState`,
      payload: {
        contentLength: value,
      },
    });
  };

  const modalProps = {
    contentLength,
    item: modalType === 'create' ? {type: 1} : currentItem,
    handleContentWordsLengthChange,
    visible: modalVisible,
    maskClosable: false,
    width: 600,
    //confirmLoading: true,
    title: `${modalType === 'create' ? '添加模板' : '修改模板'}`,
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      dispatch({
        type: `${NAMESPACE}/create`,
        payload: {
          ...data,
        },
      });
    },
    onCancel() {
      dispatch({type: `${NAMESPACE}/hideModal`});
    },
  };
  const createHandle = () => {
    dispatch({
      type: `${NAMESPACE}/showModal`,
      payload: {modalType: 'create'},
    });

    dispatch({
      type: `${NAMESPACE}/updateState`,
      payload: {contentLength: 0},
    });
  };

  const sortHandler = () => {
    dispatch({
      type: `${NAMESPACE}/updateState`,
      payload: {
        sortVisible: true,
      },
    });
  };

  // 排序参数
  const sortProps = {
    visible: sortVisible,
    maskClosable: false,
    title: '模板排序',
    data: sortDataFormat(list, 'id', 'title'),
    // confirmLoading: loading.effects['app/sort'],
    wrapClassName: 'vertical-center-modal',
    onOk(data) {
      dispatch({
        type: 'app/sort',
        payload: {
          module: 'template',
          sequence: JSON.stringify(data),
        },
      }).then(res => {
        if (res && res.success) {
          dispatch({
            type: `${NAMESPACE}/updateState`,
            payload: {
              sortVisible: false,
            },
          });
          dispatch({
            type: `${NAMESPACE}/query`,
          });
        }
      });
    },
    onCancel() {
      dispatch({
        type: `${NAMESPACE}/updateState`,
        payload: {
          sortVisible: false,
        },
      });
    },
  };

  return (
    <Page inner>
      <div style={{paddingBottom: 10}}>
        {permission.create.is ? (
          <Button type="ghost" onClick={createHandle}>
            新增
          </Button>
        ) : (
          ''
        )}
        <Button type="primary" onClick={sortHandler} style={{marginLeft: 10}}>
          排序
        </Button>
      </div>
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
      {sortVisible && <Sort {...sortProps} />}
    </Page>
  );
};

PageCom.propTypes = {
  modelState: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.bool,
};

export default connect(({[NAMESPACE]: modelState, loading}) => ({
  modelState,
  loading: loading.models[NAMESPACE],
}))(PageCom);
