import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  name: "simple-select",

  props: {
    options: {
      type: Array,
      default: [],
    },
  },

  emits: ["option-selected", "click-outside"],

  setup(props, { emit }) {
    let mounted = false;

    onMounted(() => {
      mounted = true;
    });

    function optionClicked(option: String) {
      emit("option-selected", option);
    }

    function clickOutside() {
      if (mounted) {
        emit("click-outside");
      }
    }

    return {
      optionClicked,
      clickOutside,
    };
  },
});
