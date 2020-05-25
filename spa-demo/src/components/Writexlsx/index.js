import { PureComponent } from 'react';
import XLSX from 'xlsx';
import { Button } from 'antd';

import { getReactDomText } from 'utils';

export default class Writexlsx extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }
  exportFile = () => {
    const { download, fileName, columns } = this.props;
    this.setState({
      loading: true,
    });
    download().then(data => {
      let results = [];

      if (Array.isArray(data)) {
        results = data;
      } else {
        results = data.data;
      }

      let firstData = [];
      let allData = [];

      for (let i = 0; i < columns.length; i++) {
        const item = columns[i];
        if (item.title !== '管理' && item.title !== '操作') {
          firstData.push(item.title);
        }
      }
      for (let i = 0; i < results.length; i++) {
        const item = results[i];
        const columnData = [];
        for (let j = 0; j < columns.length; j++) {
          const column = columns[j];
          if (column.title !== '管理' && column.title !== '操作') {
            if (column.render) {
              let render = column.render(item[column.dataIndex], item);
              if (typeof render === 'object') {
                render = getReactDomText(render);
              }
              columnData.push(render);
            } else {
              columnData.push(item[column.dataIndex]);
            }
          }
        }
        allData.push(columnData);
      }
      allData.unshift(firstData);

      const ws = XLSX.utils.aoa_to_sheet(allData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, fileName || '数据');
      XLSX.writeFile(wb, `${fileName || '数据'}.xlsx`);

      this.setState({
        loading: false,
      });
    });
  };
  render() {
    return (
      <Button
        className="tableDownloadBtn"
        icon="download"
        onClick={this.exportFile}
        loading={this.state.loading}
        title={`数据导出`}
      />
    );
  }
}
