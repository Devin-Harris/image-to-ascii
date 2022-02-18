const originalDensity = "Ñ@#W$9876543210?!abc;:+=-,._ ";
// const originalDensity = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,^`'. ";
let density = originalDensity;
let picture;
let invertToggle = false;

function setup() {
  const imageElement = document.getElementById('image')
  imageElement.addEventListener('change', (e) => {
    if (e.target.files[0]) {
      let urlOfImageFile = URL.createObjectURL(e.target.files[0]);
      picture = loadImage(urlOfImageFile);
      picture.loadPixels();
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            picture.resize(50, 0);
            picture.loadPixels();
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                  loadAscii();
                })
              })
            })
          })
        })
      })
    }
  })

  const thresholdElement = document.getElementById('threshold')
  thresholdElement.addEventListener('change', (e) => {
    const value = parseInt(e.target.value)
    let newDensity = originalDensity
    let count = 30
    if (value < count) {
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
    container.innerHTML = ''
    container.innerHTML = ascii
  }
}

function setDensity(newDensity) {
  density = newDensity
}