import { useEffect, useRef } from 'react'
import { useInView } from 'react-intersection-observer'

export const useScrollAnimation = (options = {}) => {
  const {
    threshold = 0.1,
    triggerOnce = true,
    rootMargin = '0px 0px -100px 0px'
  } = options

  const { ref, inView } = useInView({
    threshold,
    triggerOnce,
    rootMargin
  })

  return { ref, inView }
}
