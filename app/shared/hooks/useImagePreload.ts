'use client'

import { useEffect, useState } from 'react'

/**
 * Hook for preloading images to improve perceived performance
 * @param src - Image source URL
 * @returns Object with loading state and error state
 */
export function useImagePreload(src: string) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const img = new window.Image()
    
    img.onload = () => {
      setLoading(false)
    }
    
    img.onerror = () => {
      setLoading(false)
      setError(true)
    }
    
    img.src = src
    
    return () => {
      img.onload = null
      img.onerror = null
    }
  }, [src])

  return { loading, error }
}