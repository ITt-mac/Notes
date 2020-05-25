import React from 'react';
import SimpleMDE from 'react-simplemde-editor'; // https://github.com/sparksuite/simplemde-markdown-editor
import { config, request } from 'utils';
import 'simplemde/dist/simplemde.min.css';
import './markdown.less';

export default class MarkDown extends React.Component {
  state = {};

  onChange = () => {
    const fileBtn = this.refs.getFile;
    const file = fileBtn.files[0];
    const formData = new FormData();
    formData.append('file', file);

    request({
      url: `${config.APIV1}/upload?markdown=1`,
      method: 'post',
      data: { isFormData: formData },
    }).then(res => {
      const { editor } = this.state;
      if (res && res.success) {
        const url = res.Data[0];
        // editor.value(editor.value()+ "![](" + url + ")");
        // editor.drawImage(url);
        editor.codemirror.replaceSelection("![]("+url+")")
        this.props.handleChange(editor.value());
      }
    });
  };
  render() {
    const that = this;
    return (
      <div>
        <SimpleMDE
          options={{
            toolbar: [
              'bold',
              'italic',
              'strikethrough',
              '|',
              'heading-1',
              'heading-2',
              'heading-3',
              '|',
              'link',
              'table',
              {
                name: 'horizontal-rule',
                action: function customFunction(editor) {
                  that.setState({
                    editor,
                  });
                  const fileBtn = that.refs.getFile;
                  fileBtn.click();
                },
                className: 'fa fa-picture-o',
              },
              '|',
              'preview',
              'fullscreen',
            ],
            toolbarTips: false,
            status: false,
            autoDownloadFontAwesome: false,
            initialValue: this.props.initialValue,
          }}
          onChange={this.props.handleChange}
        />
        <input
          type="file"
          ref="getFile"
          accept="image/png, image/jpeg, image/jpg, image/gif"
          onChange={this.onChange}
          style={{ display: 'none' }}
        />
      </div>
    );
  }
}
