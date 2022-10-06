import type * as React from 'react'

export type BeforeUploadFileType = File | Blob | boolean | string

export type Action = string | ((file: BasicFile) => string | PromiseLike<string>)

export interface UploadProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onError' | 'onProgress'> {
  name?: string
  style?: React.CSSProperties
  className?: string
  disabled?: boolean
  component?: React.JSXElementConstructor<any>
  action?: Action
  method?: UploadRequestMethod
  directory?: boolean
  data?: Record<string, unknown> | ((file: BasicFile | string | Blob) => Record<string, unknown>)
  headers?: UploadRequestHeader
  accept?: string
  multiple?: boolean
  onBatchStart?: (
    fileList: { file: BasicFile; parsedFile: Exclude<BeforeUploadFileType, boolean> }[],
  ) => void
  onStart?: (file: BasicFile) => void
  onError?: (error: Error, ret: Record<string, unknown>, file: BasicFile) => void
  onSuccess?: (response: Record<string, unknown>, file: BasicFile, xhr: XMLHttpRequest) => void
  onProgress?: (event: UploadProgressEvent, file: BasicFile) => void
  beforeUpload?: (
    file: BasicFile,
    FileList: BasicFile[],
  ) => BeforeUploadFileType | Promise<void | BeforeUploadFileType>
  customRequest?: (option: UploadRequestOption) => void
  withCredentials?: boolean
  openFileDialogOnClick?: boolean
  prefixCls?: string
  id?: string
  onMouseEnter?: (e: React.MouseEvent<HTMLDivElement>) => void
  onMouseLeave?: (e: React.MouseEvent<HTMLDivElement>) => void
  onClick?: (e: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => void
}

export interface UploadProgressEvent extends Partial<ProgressEvent> {
  percent?: number
}

export type UploadRequestMethod = 'POST' | 'PUT' | 'PATCH' | 'post' | 'put' | 'patch'

export type UploadRequestHeader = Record<string, string>

export interface UploadRequestError extends Error {
  status?: number
  method?: UploadRequestMethod
  url?: string
}

export interface UploadRequestOption<T = any> {
  onProgress?: (event: UploadProgressEvent) => void
  onError?: (event: UploadRequestError | ProgressEvent, body?: T) => void
  onSuccess?: (body: T, xhr?: XMLHttpRequest) => void
  data?: Record<string, unknown>
  filename?: string
  file: Exclude<BeforeUploadFileType, File | boolean> | BasicFile
  withCredentials?: boolean
  action: string
  headers?: UploadRequestHeader
  method: UploadRequestMethod
}

export interface BasicFile extends File {
  uid: string
}
