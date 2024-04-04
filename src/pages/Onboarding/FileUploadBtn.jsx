import { Button } from '@nextui-org/react';
import React from 'react';

class FileUploadButton extends React.Component {
  constructor(props) {
    super(props);
    this.fileInputRef = React.createRef();
  }

  handleFileChange = (event) => {
    const files = event.target.files;
    // Do something with the selected files
    console.log('Selected files:', files);
  };

  handleClick = () => {
    this.fileInputRef.current.click();
  };

  render() {
    return (
      <div className='pt-8 flex'>
        <input
          type="file"
          ref={this.fileInputRef}
          style={{ display: 'none' }}
          onChange={this.handleFileChange}
        />
        <Button onClick={this.handleClick} color='secondary'>Upload File</Button>
      </div>
    );
  }
}

export default FileUploadButton;
