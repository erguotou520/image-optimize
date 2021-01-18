import { FileProcess } from '/@/types/process'
import { sizeFormat } from '/@/utils/size'
import { defineComponent, PropType } from 'vue'

const statusMap: Record<
  FileProcess['status'],
  {
    color: string
    text: string
  }
> = {
  ready: {
    color: 'gray-500',
    text: '准备'
  },
  processing: {
    color: 'gray-500',
    text: '压缩中'
  },
  failed: {
    color: 'red-500',
    text: '错误'
  },
  succeed: {
    color: 'green-500',
    text: '成功'
  }
}

export default defineComponent({
  name: 'FileProcess',
  props: {
    file: {
      type: Object as PropType<FileProcess>,
      required: true
    }
  },
  setup(props, ctx) {
    return () => (
      <div class="flex items-center py-2 border-b border-gray-200 text-sm">
        {/* <img src={props.file.filePath} width="24" height="24" class="object-cover" /> */}
        <p class="mr-2">{props.file.fileName}</p>
        <div class="ml-auto flex items-center">
          {props.file.compressedSize === 0 && <p class="text-gray-400">无优化</p>}
          {!!props.file.compressedSize && (
            <div class="mr-2 text-gray-400 flex">
              <p class="mr-2">压缩：{sizeFormat(props.file.compressedSize)}</p>
              <p>压缩比：{props.file.ratio! * 100}%</p>
            </div>
          )}
          {props.file.message && <span class="mr-2 text-red-200">{props.file.message}</span>}
          <p class={`text-${statusMap[props.file.status].color}`}>{statusMap[props.file.status].text}</p>
        </div>
      </div>
    )
  }
})
