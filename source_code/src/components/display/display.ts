import { defineComponent, nextTick, onMounted, Ref, ref, watch } from "vue";
import { waitTickAmount } from '@/utils/waitTickAmount'
import displaySettings from '@/components/display-settings/index.vue'
import { ISettings } from "@/interfaces/ISettings";
import { downloadImageFromHtmlElement } from "@/utils/downloadImageData";


const P5 = require('p5');

interface CharObject {
  r: number,
  g: number,
  b: number,
  c: string
}

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
    const ascii = ref('');
    const canvas = ref();
    const display = ref();
    const urlOfImageFile = ref();
    const settings: Ref<ISettings | undefined> = ref({
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
      threshold: originalDensity.value.length
    })
    const canvasStyles = ref({
      'font-size': '10pt',
      'line-height': '7pt',
      width: '100%',
    })
    const loading = ref(false)


    const script = function (p5: any) {
      p5.setup = (_: any) => {
        p5.noCanvas();
      }
      p5.draw = (_: any) => {
      }
    }
    const p5 = ref(new P5(script));

    function getColorOfChar(charObject: CharObject) {
      if (settings.value?.saturate === true) {
        return `rgb(${charObject.r}, ${charObject.g}, ${charObject.b})`
      }

      if (settings.value?.luminance === true) {
        const avg = (charObject.r + charObject.g + charObject.b) / 3;
        return `rgb(${avg}, ${avg}, ${avg})`
      }

      return settings.value?.color
    }

    function buildAscii() {
      let asciiObjects: CharObject[][] = []
      for (let j = 0; j < picture.value.height; j++) {
        let rowObjects: CharObject[] = [];
        for (let i = 0; i < picture.value.width; i++) {
          const pixelIndex = (i + j * picture.value.width) * 4;
          const r = picture.value.pixels[pixelIndex + 0];
          const g = picture.value.pixels[pixelIndex + 1];
          const b = picture.value.pixels[pixelIndex + 2];

          const avg = (r + g + b) / 3;

          const len = density.value.length;
          const charIndex = p5.value.floor(p5.value.map(avg, 0, 255, settings.value?.invert ? 0 : len, settings.value?.invert ? len : 0));


          const c = density.value.charAt(charIndex);
          const charObject: CharObject = {
            r,
            g,
            b,
            c: c == " " || charIndex > density.value.length - 1 ? " " : c
          }
          rowObjects.push(charObject)
        }
        asciiObjects.push(rowObjects)
      }
      return asciiObjects
    }

    function loadAsciiIntoHTML() {
      const asciiObjects = buildAscii()
      ascii.value = asciiObjects.map((rowObject: CharObject[]) => rowObject.map((charObject: CharObject) => charObject.c).join('')).join('\n');
      const html = asciiObjects.map((rowObject: CharObject[]) => {
        const mappedLine = rowObject.map((charObject: CharObject) => {
          return `
            <p
              style="
                line-height:${settings.value?.leading}pt;
                font-size: ${settings.value?.fontSize}pt;
                color: ${getColorOfChar(charObject)};
              "
            >
              ${((charObject.c === ' ') ? '&nbsp;' : charObject.c)}
            </p>
          `
        }).join('')

        return `
          <div
            style="
              display: flex;
            "
          >
            ${mappedLine}
          </div>
        `
      }).join('')
      canvas.value.innerHTML = html
    }

    async function handleUpdateFile(overwriteSettingsSize = false): Promise<any> {
      if (props.file.value) {
        loading.value = true
        urlOfImageFile.value = URL.createObjectURL(props.file.value);
        picture.value = p5.value.loadImage(urlOfImageFile.value);

        // Wait 1 tick for every kb of image data, max of 50
        await waitTickAmount(Math.min(Math.ceil(props.file.value.size / 1000), 50))

        if (overwriteSettingsSize) {
          settings.value = settings.value
            ? {
              ...settings.value,
              width: 50,
              height: Math.round(picture.value.height / (picture.value.width / 50))
            }
            : undefined
        }

        picture.value.resize(settings.value?.width, settings.value?.height);
        picture.value.loadPixels();

        loadAsciiIntoHTML()
        if (settings.value) {
          canvasStyles.value = {
            'font-size': settings.value.fontSize + 'pt',
            'line-height': settings.value.leading + 'pt',
            width: '100%',
          }
        }
        loading.value = false
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

    function handleBackgroundChange(background: string | undefined) {
      if (!background) return

      canvas.value.style.backgroundColor = background
    }

    function handleSettingsSync(newSettings: ISettings | undefined) {
      if (settings.value?.threshold !== newSettings?.threshold) {
        handleThresholdChange(newSettings?.threshold)
      }

      if (settings.value?.background !== newSettings?.background) {
        handleBackgroundChange(String(newSettings?.background))
      }

      if (settings.value?.width !== newSettings?.width || settings.value?.height !== newSettings?.height) {
        handleUpdateFile()
      }

      settings.value = newSettings ? { ...newSettings } : undefined
      loadAsciiIntoHTML()
    }

    async function handleDownloadClick() {
      loading.value = true

      const hs = canvas.value.scrollWidth > canvas.value.clientWidth;
      const vs = canvas.value.scrollHeight > canvas.value.clientHeight;
      if (hs || vs) {
        canvas.value.style.position = 'fixed'
        canvas.value.style.zIndex = '-1'
        canvas.value.style.height = 'max-content'
      }
      await waitTickAmount(10)
      await downloadImageFromHtmlElement(canvas.value)
      if (hs || vs) {
        canvas.value.style.position = 'unset'
        canvas.value.style.height = '100%'
      }
      loading.value = false
    }

    onMounted(() => {
      handleUpdateFile(true)
    })

    watch(props.file, () => {
      handleUpdateFile(true)
    })

    return {
      ascii,
      canvas,
      canvasStyles,
      density,
      display,
      handleUpdateFile,
      picture,
      settings,
      handleSettingsSync,
      originalDensity,
      handleDownloadClick,
      urlOfImageFile,
      loading
    }
  },
})