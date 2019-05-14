import React from 'react';
import { Icon } from 'antd';
import api from '../../middleware/api';
import text from '../../config/text';
import imgLoadingFailed from '../../images/imgLoadingFailed.jpg';

export default class UploadComponent extends React.Component {
  handleKey(fileType, value) {
    const propKey = `${fileType  }_key`;
    this.setState({ [propKey]: value });
  }

  handleImgError(e) {
    // 获取当前是第几张图片
    e.target.src = imgLoadingFailed;
    e.target.style.width = '80px';
    e.target.style.height = '80px';
    e.target.onerror = null;
  }

  onUpload(...args) {
    const fileType = args[0];
    const files = args[1];
    const progPropName = `${fileType  }_progress`;
    const keyPropName = `${fileType  }_key`;
    const progress = {};
    const self = this;

    files.map(file => {
      file.onprogress = e => {
        progress[file.preview] = e.percent;
        self.setState({ [progPropName]: progress });
        if (e.percent === 100) {
          // 上传成功后,保存对应的值
          self.props.form.setFieldsValue({ [fileType]: self.state[keyPropName] });
        }
      };
    });
  }

  onDrop(...args) {
    const fileType = args[0];
    const files = args[1];
    const filePropName = `${fileType  }_files`;

    this.setState({ [filePropName]: files });
  }

  getToken(url, fileType) {
    api.ajax({ url }, data => {
      const propToken = `${fileType  }_token`;
      const propKey = `${fileType  }_key`;
      const response = data.res;

      this.setState({
        [propToken]: response.token,
        [propKey]: response.file_name,
      });
    });
  }

  getPrivateToken(fileType) {
    api.ajax({
      url: api.system.getPrivatePicUploadToken(fileType),
    }, data => {
      const propToken = `${fileType  }_token`;
      const propKey = `${fileType  }_key`;
      const response = data.res;

      this.setState({
        [propToken]: response.token,
        [propKey]: response.file_name,
      });
    });
  }

  getImageUrl(url, fileType) {
    api.ajax({ url }, data => {
      const imgUrl = `${fileType  }_url`;
      this.setState({ [imgUrl]: data.res.url });
    });
  }

  getPrivateImageUrl(fileType, fileKey) {
    api.ajax({ url: api.system.getPrivatePicUrl(fileKey) }, data => {
      const imgUrl = `${fileType  }_url`;
      this.setState({ [imgUrl]: data.res.url });
    });
  }

  getPublicImageUrl(fileType, fileKey) {
    api.ajax({ url: api.system.getPublicPicUrl(fileKey) }, data => {
      const imgUrl = `${fileType  }_url`;
      this.setState({ [imgUrl]: data.res.url });
    });
  }

  renderImage(fileType, progressPosition, imgPosition) {
    const filesPropName = `${fileType  }_files`;
    const progPropName = `${fileType  }_progress`;
    const imgUrlName = `${fileType  }_url`;

    const files = this.state[filesPropName] || [];
    const progress = this.state[progPropName];
    const imgUrl = this.state[imgUrlName];

    if (files.length <= 0) {
      if (imgUrl) {
        return (
          <img
            src={imgUrl}
            style={imgPosition ? imgPosition : { height: '90%', width: '90%' }}
            onError={this.handleImgError.bind(this)}
          />
        );
      } else {
        return (
          <span
            className="ant-upload-select-picture-card"
            style={{
              width: '100%',
              display: 'block',
              margin: '0',
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}>
            <Icon type="cloud-upload-o" style={{ marginTop: '5px' }} />
            <div className="ant-upload-text">{text.imageLabel[fileType]}</div>
          </span>
        );
      }
    }

    return (
      <div className="center">
        {[].map.call(files, (file, i) => {
          let preview = '';
          const uploadProgress = Math.round(progress && progress[file.preview]);
          if (/image/.test(file.type)) {
            preview = (
              <img
                src={file.preview}
                style={imgPosition ? imgPosition : { height: '90%', width: '90%' }}
              />
            );
          }
          return (
            progressPosition
              ? <span key={i}>
                  {preview}
                <span style={progressPosition}>
                    {`已上传${  uploadProgress || 0  }%`}
                  </span>
                </span>
              : <span key={i}>
                  {preview}
                <span className="progress">{`已上传${  uploadProgress || 0  }%`}</span>
                </span>
          );
        })}
      </div>
    );
  }
}
