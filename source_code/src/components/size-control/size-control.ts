import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: 'size-control',

  props: {
    width: {
      type: Number,
      default: 50
    },
    height: {
      type: Number,
      default: 50
    }
  },

  emits: ['width-change', 'height-change'],

  setup(props, { emit }) {
    const lockAspectRatio = ref(true)

    function handleWidthChange(e: Event) {
      const target = e.target as HTMLInputElement
      const newWidth = parseInt(target.value)

      if (lockAspectRatio.value) {
        emit('height-change', Math.round(props.height * newWidth / props.width))
      }
      emit('width-change', newWidth)
    }

    function handleHeightChange(e: Event) {
      const target = e.target as HTMLInputElement
      const newHeight = parseInt(target.value)

      if (lockAspectRatio.value) {
        emit('width-change', Math.round(props.width * newHeight / props.height))
      }
      emit('height-change', newHeight)
    }

    function toggleLockAspectRatio() {
      lockAspectRatio.value = !lockAspectRatio.value
    }

    return {
      lockAspectRatio,
      handleWidthChange,
      handleHeightChange,
      toggleLockAspectRatio
    }
  }
})