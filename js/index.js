const originalDensity = "Ñ@#W$9876543210?!abc;:+=-,._ ";
let density = originalDensity;
let picture;
let img;
let invertToggle = false;
let imagePath;

function setup() {
  const imageElement = document.getElementById('image')
  imageElement.addEventListener('change', (e) => {
    let urlOfImageFile = URL.createObjectURL(e.target.files[0]);
    picture = loadImage(urlOfImageFile)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        picture.loadPixels();
        loadAscii()
      })
    })
  })

  const thresholdElement = document.getElementById('threshold')
  thresholdElement.addEventListener('change', (e) => {
    const value = parseInt(e.target.value)
    let newDensity = originalDensity
    let count = 50
    if (value < 50) {
      while (count > value) {
        if (newDensity.length > 1) {
          newDensity = newDensity.slice(0, newDensity.length - 1)
        }
        count -= 1
      }
    } else {
      while (count < value) {
        newDensity += ' '
        count += 1
      }
    }

    setDensity(newDensity)
    loadAscii()
  })

  const invertToggleElement = document.getElementById('invert')
  invertToggleElement.addEventListener('input', (e) => {
    invertToggle = e.target.checked
    loadAscii()
  })

  noCanvas();
  picture.loadPixels();
  loadAscii()
}

function draw() {
}

function buildAscii() {
  let ascii = ''
  for (let j = 0; j < picture.height; j++) {
    let row = "";
    for (let i = 0; i < picture.width; i++) {
      const pixelIndex = (i + j * picture.width) * 4;
      const r = picture.pixels[pixelIndex + 0];
      const g = picture.pixels[pixelIndex + 1];
      const b = picture.pixels[pixelIndex + 2];

      const avg = (r + g + b) / 3;

      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, invertToggle ? 0 : len, invertToggle ? len : 0));

      const c = density.charAt(charIndex);
      if (c == " ") row += "&nbsp;";
      else row += c;
    }
    ascii += row + '<br />'
  }
  return ascii
}

function loadAscii() {
  const ascii = buildAscii()
  const container = document.getElementById('ascii-container')
  if (container) {
    container.innerHTML = ascii
  }
}

function setDensity(newDensity) {
  density = newDensity
}