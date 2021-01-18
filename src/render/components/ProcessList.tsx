import { FileProcess } from '@/types/process'
import { defineComponent, PropType } from 'vue'
import ProcessItem from './ProcessItem'

export default defineComponent({
  name: 'ProcessList',
  props: {
    files: {
      type: Object as PropType<FileProcess[]>,
      required: true
    }
  },
  setup(props, ctx) {
    return () => props.files.map(file => <ProcessItem file={file} />)
  }
})
