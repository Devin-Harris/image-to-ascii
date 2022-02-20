import { defineComponent, nextTick, ref, watch } from "vue";
import { waitTickAmount } from '@/utils/waitTickAmount'
const P5 = require('p5');

export default defineComponent({
  name: 'display',

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
    const settings = ref({
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
        ascii += row + '<br />'
      }
      return ascii
    }

    async function handleNewFile(): Promise<any> {
      if (props.file.value) {
        let urlOfImageFile = URL.createObjectURL(props.file.value);
        picture.value = p5.value.loadImage(urlOfImageFile);

        // Wait 1 tick for every kb of image data, max of 50
        await waitTickAmount(Math.min(Math.ceil(props.file.value.size / 1000), 50))

        picture.value.resize(50, 0);
        picture.value.loadPixels();

        ascii.value = buildAscii();
        canvas.value.innerHTML = ascii.value
        const canvasBounds = canvas.value.getBoundingClientRect()
        const displayBounds = display.value.getBoundingClientRect()
        const newHeight = canvasBounds.height + Math.ceil(settings.value.fontSize - settings.value.leading)
        canvasStyles.value = {
          'font-size': settings.value.fontSize + 'pt',
          'line-height': settings.value.leading + 'pt',
          width: '100%',
          'height': (newHeight > displayBounds.height ? displayBounds.height : newHeight) + 'px',
        }
      }
    }

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
    }
  },
})