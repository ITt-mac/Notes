import React from 'react';
import { Modal, Tree, Radio, message } from 'antd';

const TreeNode = Tree.TreeNode;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const getIdAndSort = arr => {
  const results = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    results.push({
      id: item.id,
      sort: i,
    });
    if (item.children) {
      results.push(...getIdAndSort(item.children));
    }
  }
  return results;
};

export default class Sort extends React.Component {
  state = {
    gData: this.props.data,
  };
  componentDidMount() {
    if (this.props.types) {
      const first = this.props.types[0];
      const list = this.props.data.filter(
        item => item[this.props.typeName || 'type'] == first.value
      );
      this.setState({
        gData: list,
        type: first.value,
      });
    }
  }
  onChange = e => {
    const type = e.target.value;
    const list = this.props.data.filter(
      item => item[this.props.typeName || 'type'] === type
    );
    this.setState({
      gData: list,
      type,
    });
  };
  onDrop = info => {
    if (!info.dropToGap) {
      message.warning('只能同级间排序，禁止更换上下级关系');
      return false;
    }

    const dropKey = info.node.props.eventKey;
    const dragKey = info.dragNode.props.eventKey;
    const dropPos = info.node.props.pos.split('-');
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key == key) {
          return callback(item, index, arr);
        }
        if (item.children && item.children.length) {
          return loop(item.children, key, callback);
        }
      });
    };

    const data = [...this.state.gData];
    let dragObj;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    let ar, i;
    loop(data, dropKey, (item, index, arr) => {
      ar = arr;
      i = index;
    });
    if (dropPosition === -1) {
      ar.splice(i, 0, dragObj);
    } else {
      ar.splice(i + 1, 0, dragObj);
    }
    this.setState({
      gData: data,
    });
  };
  render() {
    const loop = data =>
      data.map(item => {
        if (item.children && item.children.length) {
          return (
            <TreeNode key={item.key} title={item.title}>
              {loop(item.children)}
            </TreeNode>
          );
        }
        return <TreeNode key={item.key} title={item.title} />;
      });

    const { onOk, isLocal } = this.props;
    return (
      <Modal
      visible={true}
        {...this.props}
        onOk={() =>
          onOk(
            isLocal ? this.state.gData : getIdAndSort(this.state.gData),
            this.state.type
          )
        }>
        {this.props.types ? (
          <RadioGroup
            defaultValue={this.props.types[0].value}
            onChange={this.onChange}
            style={{ marginLeft: 24, marginBottom: 15 }}>
            {this.props.types.map(item => (
              <RadioButton value={item.value} key={item.value}>
                {item.text}
              </RadioButton>
            ))}
          </RadioGroup>
        ) : null}
        <Tree
          className="draggable-tree"
          draggable
          autoExpandParent={false}
          onDrop={this.onDrop}>
          {loop(this.state.gData)}
        </Tree>
      </Modal>
    );
  }
}
