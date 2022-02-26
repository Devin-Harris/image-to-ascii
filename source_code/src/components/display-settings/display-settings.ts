import { ISettings } from "@/interfaces/ISettings";
import { copyToClipboard } from "@/utils/copyToClipboard";
import { defineComponent, onMounted, PropType, Ref, ref, watch } from "vue";
import SizeControl from '@/components/size-control/index.vue';
import SliderToggle from '@/components/slider-toggle/index.vue';

export default defineComponent({
  name: 'display-settings',

  components: {
    SizeControl,
    SliderToggle
  },

  props: {
    ascii: {
      type: String,
      default: ''
    },
    settings: {
      type: Object as PropType<ISettings | undefined>,
      default: {
        fontSize: 10,
        leading: 7,
        width: 50,
        height: 50,
        showingAscii: true,
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

  emits: ['sync-settings', 'download-click'],

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
      if (mutatedSettings.value && mutatedSettings.value.threshold) {
        mutatedSettings.value.threshold = target.valueAsNumber
        syncSettings()
      }
    }

    function fontSizeChange(e: Event) {
      const target = e.target as HTMLInputElement
      if (mutatedSettings.value && mutatedSettings.value.fontSize) {
        mutatedSettings.value.fontSize = target.valueAsNumber
        syncSettings()
      }
    }

    function leadingChange(e: Event) {
      const target = e.target as HTMLInputElement
      if (mutatedSettings.value && mutatedSettings.value.leading) {
        mutatedSettings.value.leading = target.valueAsNumber
        syncSettings()
      }
    }

    function luminanceChange(e: Event, labelOverride: null | boolean = null) {
      const target = e.target as HTMLInputElement
      if (mutatedSettings.value && mutatedSettings.value.luminance !== null && mutatedSettings.value.luminance !== undefined) {
        mutatedSettings.value.luminance = labelOverride !== null ? labelOverride : Boolean(target.checked)
        syncSettings()
      }
    }

    function saturateChange(e: Event, labelOverride: null | boolean = null) {
      const target = e.target as HTMLInputElement
      if (mutatedSettings.value && mutatedSettings.value.saturate !== null && mutatedSettings.value.saturate !== undefined) {
        mutatedSettings.value.saturate = labelOverride !== null ? labelOverride : Boolean(target.checked)
        syncSettings()
      }
    }

    function widthChange(newWidth: number) {
      if (mutatedSettings.value && mutatedSettings.value.width) {
        mutatedSettings.value.width = newWidth
        syncSettings()
      }
    }

    function heightChange(newHeight: number) {
      if (mutatedSettings.value && mutatedSettings.value.height) {
        mutatedSettings.value.height = newHeight
        syncSettings()
      }
    }

    function handleOriginalAsciiToggle(newOriginalAsciiValue: boolean) {
      if (mutatedSettings.value && mutatedSettings.value.showingAscii !== null && mutatedSettings.value.showingAscii !== undefined) {
        mutatedSettings.value.showingAscii = newOriginalAsciiValue
        syncSettings()
      }
    }

    function handleInvertToggle(newInvertValue: boolean) {
      if (mutatedSettings.value && mutatedSettings.value.invert !== null && mutatedSettings.value.invert !== undefined) {
        mutatedSettings.value.invert = newInvertValue
        syncSettings()
      }
    }

    function initializeSettings() {
      mutatedSettings.value = props.settings ? { ...props.settings } : undefined
    }

    function syncSettings() {
      emit('sync-settings', mutatedSettings.value)
    }

    function triggerCopyToClipboard() {
      copyToClipboard(props.ascii)
    }

    function triggerImageDownload() {
      emit('download-click')
    }

    onMounted(() => {
      initializeSettings()
    })

    watch(() => props.settings, () => {
      initializeSettings()
    })

    return {
      collapsed,
      collapse,
      open,
      thresholdChange,
      mutatedSettings,
      triggerCopyToClipboard,
      triggerImageDownload,
      widthChange,
      heightChange,
      handleOriginalAsciiToggle,
      handleInvertToggle,
      fontSizeChange,
      leadingChange,
      luminanceChange,
      saturateChange
    }
  },
})