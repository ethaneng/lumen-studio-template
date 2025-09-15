/**
 * Image optimization utilities
 * Provides helpers for efficient image loading and blur generation
 */

// For static images, we pre-generate blur data URLs
// In a real project, you'd generate these at build time
export const HERO_IMAGES = {
  BEACH_VIEW: {
    src: '/assets/images/beach-view.jpeg',
    alt: 'Beautiful beach aerial view with turquoise waters',
    blurDataURL: 'data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wgARCAAEAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAP/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/aAAwDAQACEAMQAAABrET/xAAVEAEBAAAAAAAAAAAAAAAAAAAAEf/aAAgBAQABBQKK/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAwEBPwF//8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAgBAgEBPwF//8QAFBABAAAAAAAAAAAAAAAAAAAAEP/aAAgBAQAGPwI//8QAFhABAQEAAAAAAAAAAAAAAAAAEQAx/9oACAEBAAE/IQZK/9oADAMBAAIAAwAAABB//8QAFhEAAwAAAAAAAAAAAAAAAAAAAAER/9oACAEDAQE/EIj/xAAVEQEBAAAAAAAAAAAAAAAAAAAAAf/aAAgBAgEBPxCP/8QAFxABAQEBAAAAAAAAAAAAAAAAAREAIf/aAAgBAQABPxAOgXN3u//Z',
  }
} as const

/**
 * Generate responsive image sizes for different breakpoints
 */
export function getResponsiveImageSizes(
  mobile = '100vw',
  tablet = '100vw', 
  desktop = '100vw'
) {
  return `(max-width: 768px) ${mobile}, (max-width: 1024px) ${tablet}, ${desktop}`
}

/**
 * Get optimized image props for hero sections
 */
export function getHeroImageProps(imageKey: keyof typeof HERO_IMAGES) {
  const image = HERO_IMAGES[imageKey]
  
  return {
    src: image.src,
    alt: image.alt,
    fill: true,
    className: "object-cover object-center",
    priority: true,
    quality: 90,
    sizes: "100vw",
    placeholder: "blur" as const,
    blurDataURL: image.blurDataURL,
  }
}