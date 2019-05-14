import React from 'react';
import AvatarEditor from 'react-avatar-editor';

const enlarge = require('../../../images/enlarge.png');
const narrow = require('../../../images/narrow.png');
const rotatePic = require('../../../images/rotate.png');

require('./style.less');

class ImageAvatar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scale: props.scale,
      rotate: props.rotate,
    };

    [
      'handlePicEnlarge',
      'handlePicNarrow',
      'handlePicRotate',
    ].map(method => this[method] = this[method].bind(this));
  }

  handlePicEnlarge() {
    const { scale } = this.state;
    this.setState({ scale: Number(scale) + 0.3 });
  }

  handlePicNarrow() {
    const { scale } = this.state;
    if (Number(scale > 0.5)) {
      this.setState({ scale: Number(scale) - 0.3 });
    }
  }

  handlePicRotate() {
    const { rotate } = this.state;
    const currentRotate = Number(rotate) + 90;
    const remainderRotate = currentRotate % 360;

    this.setState({ rotate: remainderRotate });
  }

  render() {
    const { src, width, height, border, color } = this.props;
    const { scale, rotate } = this.state;

    return (
      <div className="content">
        <AvatarEditor
          image={src}
          width={width}
          height={height}
          border={border}
          color={color}
          scale={scale}
          rotate={rotate}
          crossOrigin="anonymous"
        />

        <div className="pictures-content">
          <div className="pic-content">
            <img src={enlarge} onClick={this.handlePicEnlarge} />
            <p>放大</p>
          </div>

          <div className="pic-content">
            <img src={narrow} onClick={this.handlePicNarrow} />
            <p>缩小</p>
          </div>

          <div className="pic-content">
            <img src={rotatePic} onClick={this.handlePicRotate} />
            <p>旋转</p>
          </div>
        </div>
      </div>
    );
  }
}

ImageAvatar.defaultProps = {
  width: 300,
  border: 100,
  color: [0, 0, 0, 0.3],
  scale: 1,
  rotate: 0,
};

export default ImageAvatar;