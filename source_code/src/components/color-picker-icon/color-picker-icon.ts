import { defineComponent, ref } from 'vue';
import { ColorPicker } from 'vue-color-kit'
import 'vue-color-kit/dist/vue-color-kit.css'

export default defineComponent({
  name: 'color-picker-icon',

  components: {
    ColorPicker
  },

  props: {
    color: {
      type: String,
      default: '#FFFFFF'
    }
  },

  emits: ['color-change'],

  setup(props, { emit }) {
    const colorPickerOpen = ref(false)
    const picker = ref()

    function toggleColorPicker(e: Event) {
      colorPickerOpen.value = !colorPickerOpen.value
    }

    function closeColorPicker() {
      colorPickerOpen.value = false
    }

    function clickOutside() {
      closeColorPicker()
    }

    function changeColor(e: { hex: string }) {
      emit('color-change', e.hex)
    }

    return {
      changeColor,
      colorPickerOpen,
      toggleColorPicker,
      picker,
      clickOutside
    }
  }
})