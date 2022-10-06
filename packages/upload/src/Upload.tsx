import React, { Component } from 'react'
import AjaxUpload from './Uploader'
import type { UploadProps, BasicFile } from './interface'

function empty() {}

class Upload extends Component<UploadProps> {
  static defaultProps = {
    component: 'span',
    prefixCls: 'basic-upload',
    data: {},
    headers: {},
    name: 'file',
    multipart: false,
    onStart: empty,
    onError: empty,
    onSuccess: empty,
    multiple: false,
    // @ts-ignore
    beforeUpload: null,
    // @ts-ignore
    customRequest: null,
    withCredentials: false,
    openFileDialogOnClick: true,
  }

  private uploader: AjaxUpload

  abort(file: BasicFile) {
    this.uploader.abort(file)
  }

  saveUploader = (node: AjaxUpload) => {
    this.uploader = node
  }

  render() {
    return <AjaxUpload {...this.props} ref={this.saveUploader} />
  }
}

export default Upload