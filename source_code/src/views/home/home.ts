import { defineComponent, reactive, ref } from "vue";
import display from '@/components/display/index.vue'
import fileInput from '@/components/fileInput/index.vue'

export default defineComponent({
  name: 'home',

  components: {
    display,
    fileInput
  },

  setup() {
    const file = reactive({ value: null as File | null })

    function inputChange(files: FileList) {
      if (files.length > 0) {
        file.value = files[0]
      }
    }

    return {
      file,
      inputChange
    }
  }
})