import { defineComponent, ref } from "vue";

export default defineComponent({
  name: 'fileInput',

  props: {
    fileInputLabel: {
      type: String,
      default: 'Choose an image'
    },
    fileInputIconClass: {
      type: String,
      default: 'fa fa-upload'
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },

  emits: ['input-change'],

  setup(props, { emit }) {
    const input = ref();
    const button = ref();

    function clickInput() {
      input.value.click();
    }

    function dropInput(e: DragEvent) {
      emit('input-change', e.dataTransfer?.files)
      button.value.classList.remove('dropping')
    }
    function dragEnter() {
      button.value.classList.add('dropping')
    }
    function dragLeave() {
      button.value.classList.remove('dropping')
    }

    function inputChange(e: Event) {
      if (e && e.target) {
        const target = e.target as HTMLInputElement;
        const files = target.files;
        emit('input-change', files)
      }
    }

    return {
      button,
      clickInput,
      dragEnter,
      dragLeave,
      dropInput,
      input,
      inputChange
    }
  }
})