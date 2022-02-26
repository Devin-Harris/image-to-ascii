import { defineComponent, ref } from "vue";

export default defineComponent({
  name: 'slider-toggle',

  props: {
    value: {
      type: Boolean,
      default: false
    },
  },

  emits: ['toggle'],

  setup(props, { emit }) {
    function toggleSlider() {
      emit('toggle', !props.value)
    }

    return {
      toggleSlider
    }
  }
})