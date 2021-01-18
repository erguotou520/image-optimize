const { readFile, writeFile } = require('fs')
const { promisify } = require('util')
const { parse } = require('path')
import { FileProcess } from '/@/types/process'

const SVGO = require('svgo')

const svgo = new SVGO()

export type CompressResult = Pick<FileProcess, 'compressedSize' | 'message' | 'ratio' | 'status'>

export async function compressSvg(filePath: string): Promise<CompressResult> {
  try {
    const svgContent = await promisify(readFile)(filePath, 'utf8')
    const originSize = Buffer.byteLength(svgContent)
    const result = await svgo.optimize(svgContent)
    await promisify(writeFile)(filePath, result.data, 'utf8')
    const resultSize = Buffer.byteLength(result.data)
    return {
      status: 'succeed',
      ratio: Math.ceil((resultSize / originSize) * 100) / 100,
      compressedSize: originSize - resultSize
    }
  } catch (error) {
    console.error(error)
    return {
      status: 'failed',
      message: error?.message ?? error?.toString() ?? '未知错误'
    }
  }
}

export async function compress(file: FileProcess): Promise<CompressResult> {
  const { ext } = parse(file.filePath)
  switch (ext) {
    case '.svg':
      return compressSvg(file.filePath)
    default:
      return {
        message: '暂不支持的格式',
        status: 'failed'
      }
  }
}
