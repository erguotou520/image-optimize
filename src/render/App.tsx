import { defineComponent, nextTick, ref, watch, watchEffect } from 'vue'
import DragArea from './components/DragArea'
import ProcessList from './components/ProcessList'
import useDrop from './hooks/useDrop'
import { FileProcess } from './types/process'
import { compress } from './utils/compress'

export default defineComponent({
  name: 'App',
  setup(props, ctx) {
    const files = ref<FileProcess[]>([])

    const droppedFiles = useDrop()

    watchEffect(() => {
      files.value.push(
        ...droppedFiles.value.map<FileProcess>(file => ({
          file,
          fileName: file.name,
          filePath: file.path,
          status: 'ready'
        }))
      )
    })

    watchEffect(() => {
      files.value.forEach(async file => {
        file.status = 'processing'
        const compressResult = await compress(file)
        Object.assign(file, compressResult)
      })
    })

    return () => (files.value.length ? <ProcessList files={files.value} /> : <DragArea />)
  }
})
