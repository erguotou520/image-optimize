export type FileProcess = {
  file: File
  fileName: string
  filePath: string
  status: 'ready' | 'processing' | 'succeed' | 'failed'
  // 压缩了多少
  compressedSize?: number
  // 压缩比
  ratio?: number
  // 压缩错误信息
  message?: string
}
