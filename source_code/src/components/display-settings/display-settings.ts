import { ISettings } from "@/interfaces/ISettings";
import { defineComponent, onMounted, PropType, Ref, ref, watch } from "vue";

export default defineComponent({
  name: 'display-settings',

  props: {
    settings: {
      type: Object as PropType<ISettings | undefined>,
      default: {
        fontSize: 10,
        leading: 7,
        width: 50,
        height: 50,
        showingOriginal: false,
        invert: false,
        background: '#000000',
        color: '#FFFFFF',
        luminance: false,
        saturate: false,
        threshold: 0,
      }
    },
    originalDensity: {
      type: String,
      default: ''
    }
  },

  emits: ['sync-settings'],

  setup(props, { emit }) {
    const collapsed = ref(false)
    const mutatedSettings: Ref<ISettings | undefined> = ref()

    function collapse() {
      collapsed.value = true
    }

    function open() {
      collapsed.value = false
    }

    function thresholdChange(e: Event) {
      const target = e.target as HTMLInputElement
      if (mutatedSettings.value) {
        mutatedSettings.value.threshold = target.valueAsNumber
        syncSettings()
      }
    }

    function initializeSettings() {
      mutatedSettings.value = props.settings ? { ...props.settings } : undefined
    }

    function syncSettings() {
      emit('sync-settings', mutatedSettings.value)
    }

    onMounted(() => {
      initializeSettings()
    })

    return {
      collapsed,
      collapse,
      open,
      thresholdChange,
      mutatedSettings
    }
  },
})