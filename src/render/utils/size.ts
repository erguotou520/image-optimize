// 字节大小
export function sizeFormat(bytes: number) {
  // https://blog.csdn.net/lilinoscar/article/details/40825997
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Math.ceil((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}
