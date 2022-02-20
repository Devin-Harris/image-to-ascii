import { defineComponent, nextTick, onMounted, Ref, ref, watch } from "vue";
import { waitTickAmount } from '@/utils/waitTickAmount'
import displaySettings from '@/components/display-settings/index.vue'
import { ISettings } from "@/interfaces/ISettings";

const P5 = require('p5');

export default defineComponent({
  name: 'display',

  components: {
    displaySettings
  },

  props: {
    file: {
      type: Object,
      required: true
    }
  },

  setup(props) {
    const originalDensity = ref("Ñ@#W$9876543210?!abc;:+=-,._ ");
    const density = ref(originalDensity.value);
    const picture = ref();
    const invertToggle = ref(false);
    const ascii = ref('');
    const canvas = ref();
    const display = ref();
    const settings: Ref<ISettings | undefined> = ref({
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
      threshold: originalDensity.value.length
    })
    const canvasStyles = ref({
      'font-size': '10pt',
      'line-height': '7pt',
      width: '100%',
      height: '100%'
    })


    const script = function (p5: any) {
      p5.setup = (_: any) => {
        p5.noCanvas();
      }
      p5.draw = (_: any) => {
      }
    }
    const p5 = ref(new P5(script));

    function buildAscii() {
      let ascii = ''
      for (let j = 0; j < picture.value.height; j++) {
        let row = "";
        for (let i = 0; i < picture.value.width; i++) {
          const pixelIndex = (i + j * picture.value.width) * 4;
          const r = picture.value.pixels[pixelIndex + 0];
          const g = picture.value.pixels[pixelIndex + 1];
          const b = picture.value.pixels[pixelIndex + 2];

          const avg = (r + g + b) / 3;

          const len = density.value.length;
          const charIndex = p5.value.floor(p5.value.map(avg, 0, 255, invertToggle.value ? 0 : len, invertToggle.value ? len : 0));

          const c = density.value.charAt(charIndex);
          if (c == " " || charIndex > density.value.length - 1) row += "&nbsp;";
          else row += c;
        }
        ascii += row + '\n'
      }
      return ascii
    }

    function loadAsciiIntoHTML() {
      ascii.value = buildAscii();
      canvas.value.innerHTML = ascii.value.split('\n').join('<br />')
    }

    async function handleNewFile(): Promise<any> {
      if (props.file.value) {
        let urlOfImageFile = URL.createObjectURL(props.file.value);
        picture.value = p5.value.loadImage(urlOfImageFile);

        // Wait 1 tick for every kb of image data, max of 50
        await waitTickAmount(Math.min(Math.ceil(props.file.value.size / 1000), 50))

        picture.value.resize(50, 0);
        picture.value.loadPixels();

        loadAsciiIntoHTML()
        const canvasBounds = canvas.value.getBoundingClientRect()
        const displayBounds = display.value.getBoundingClientRect()

        if (settings.value) {
          const newHeight = canvasBounds.height + Math.ceil(settings.value.fontSize - settings.value.leading) + 8
          canvasStyles.value = {
            'font-size': settings.value.fontSize + 'pt',
            'line-height': settings.value.leading + 'pt',
            width: '100%',
            'height': (newHeight > displayBounds.height ? displayBounds.height : newHeight) + 'px',
          }
        }
      }
    }

    function handleThresholdChange(threshold: number | undefined) {
      if (!threshold) return

      let newDensity = originalDensity.value
      let count = originalDensity.value.length
      if (threshold < count) {
        while (count > threshold) {
          if (newDensity.length > 1) {
            newDensity = newDensity.slice(0, newDensity.length - 1)
          }
          count -= 1
        }
      } else {
        while (count < threshold) {
          newDensity += ' '
          count += 1
        }
      }
      density.value = newDensity
    }

    function handleSettingsSync(newSettings: ISettings | undefined) {
      if (settings.value?.threshold !== newSettings?.threshold) {
        handleThresholdChange(newSettings?.threshold)
      }

      settings.value = newSettings ? { ...newSettings } : undefined
      loadAsciiIntoHTML()
    }

    onMounted(() => {
      handleNewFile()
    })

    watch(props.file, () => {
      handleNewFile()
    })

    return {
      ascii,
      canvas,
      canvasStyles,
      density,
      display,
      handleNewFile,
      picture,
      settings,
      handleSettingsSync,
      originalDensity
    }
  },
})