const { Jimp } = require('jimp');

async function processImage(input, output) {
  const image = await Jimp.read(input);
  
  // Make black pixels transparent
  image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
    const red = this.bitmap.data[idx + 0];
    const green = this.bitmap.data[idx + 1];
    const blue = this.bitmap.data[idx + 2];
    
    // Threshold for black/dark colors
    if (red < 40 && green < 40 && blue < 40) {
      this.bitmap.data[idx + 3] = 0; // alpha to 0
    }
  });

  await image.write(output);
  console.log(`Saved ${output}`);
}

processImage('public/wing-left.jpg', 'public/wing-left.png');
processImage('public/wing-right.jpg', 'public/wing-right.png');
