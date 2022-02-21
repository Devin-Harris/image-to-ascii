export function downloadImageData(imageData: string, imageName = 'image.png') {
  // create temporary link  
  const link = document.createElement('a');
  link.download = imageName; // set the name of the download file 
  link.href = imageData;

  // temporarily add link to body and initiate the download  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}