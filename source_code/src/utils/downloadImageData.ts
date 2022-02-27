// @ts-ignore
import domtoimage from "dom-to-image-more";

export function downloadImageFromHtmlElement(elm: HTMLElement, format = 'png', imageName = 'download') {
  return new Promise((resolve, reject) => {
    try {
      if (format === 'png') {
        domtoimage
          .toPng(elm)
          .then((dataUrl: string) => {
            var link = document.createElement("a");
            link.download = imageName + '.' + format;
            link.href = dataUrl;
            link.click();
            resolve('Downloaded Image')
          });
      } else if (format === 'jpeg' || format === 'jpg') {
        domtoimage
          .toJpeg(elm)
          .then((dataUrl: string) => {
            var link = document.createElement("a");
            link.download = imageName + '.' + format;
            link.href = dataUrl;
            link.click();
            resolve('Downloaded Image')
          });
      } else {
        throw 'Invalid Format'
      }
    } catch (e) {
      reject(e)
    }
  })
}