import { defineComponent } from 'vue'

import './DragArea.css'

export default defineComponent({
  name: 'DragArea',
  setup(props, ctx) {
    return () => <div class={`flex-1 drag-area`}>拖拽图片至此开始压缩</div>
  }
})
