const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

/**
 * Generate blur data URLs for images
 * This script processes images and creates base64 blur placeholders
 */

async function generateBlurDataURL(imagePath) {
  try {
    const buffer = await sharp(imagePath)
      .resize(10, 10, { fit: 'inside' })
      .blur(1)
      .jpeg({ quality: 20, progressive: true })
      .toBuffer();
    
    const base64 = buffer.toString('base64');
    return `data:image/jpeg;base64,${base64}`;
  } catch (error) {
    console.error(`Error processing ${imagePath}:`, error);
    return null;
  }
}

async function processImages() {
  const imagesDir = path.join(__dirname, '../public/assets/images');
  const images = [
    'beach-view.jpeg',
    'pair-walking.jpeg', 
    'girl-with-hat.jpg',
    'woman-at-beach.jpeg',
    'beach-through-the-trees.jpg'
  ];

  console.log('Generating blur data URLs...\n');

  for (const image of images) {
    const imagePath = path.join(imagesDir, image);
    
    if (fs.existsSync(imagePath)) {
      const blurDataURL = await generateBlurDataURL(imagePath);
      
      if (blurDataURL) {
        console.log(`${image}:`);
        console.log(`"${blurDataURL}"\n`);
      }
    } else {
      console.log(`⚠️  Image not found: ${image}`);
    }
  }
}

// Run if called directly
if (require.main === module) {
  processImages().catch(console.error);
}

module.exports = { generateBlurDataURL };