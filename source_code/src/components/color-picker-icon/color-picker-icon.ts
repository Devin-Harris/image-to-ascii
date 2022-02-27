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

  setup(props, { emit }) {
    const colorPickerOpen = ref(false)

    function toggleColorPicker(e: Event) {
      colorPickerOpen.value = !colorPickerOpen.value
    }

    function changeColor(e: Event) {
      console.log(e)
    }

    return {
      changeColor,
      colorPickerOpen,
      toggleColorPicker
    }
  }
})