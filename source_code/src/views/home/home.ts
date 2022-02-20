import { defineComponent, ref } from "vue";
import fileInput from '@/components/fileInput/index.vue'

export default defineComponent({
  name: 'home',

  components: {
    fileInput
  },

  setup() {
    const file = ref()

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