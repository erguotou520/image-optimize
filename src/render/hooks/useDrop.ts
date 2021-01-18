import { onMounted, ref } from 'vue'

const BODY_DRAGING_CLASS = 'draging'

export default function useDrop() {
  const files = ref<File[]>([])
  const onDragLeave = () => {
    document.body.classList.remove(BODY_DRAGING_CLASS)
  }
  const onDragOver = (e: DragEvent) => {
    e.preventDefault()
    document.body.classList.add(BODY_DRAGING_CLASS)
  }
  const onDrop = (ev: DragEvent) => {
    ev.preventDefault()
    document.body.classList.remove(BODY_DRAGING_CLASS)
    if (ev.dataTransfer?.files?.length) {
      files.value = Array.from(ev.dataTransfer.files)
    }
  }

  onMounted(() => {
    // 组件销毁事件也不销毁
    document.body.ondragleave = onDragLeave
    document.body.ondragover = onDragOver
    document.body.ondrop = onDrop
  })

  return files
}
