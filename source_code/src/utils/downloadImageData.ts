// @ts-ignore
import domtoimage from "dom-to-image-more";

export function downloadImageFromHtmlElement(elm: HTMLElement, imageName = 'image.jpeg') {
  return domtoimage
    .toJpeg(elm, { quality: 0.95 })
    .then((dataUrl: string) => {
      var link = document.createElement("a");
      link.download = imageName;
      link.href = dataUrl;
      link.click();
    });
}