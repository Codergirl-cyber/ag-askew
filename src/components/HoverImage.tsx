import { useState } from 'react'
import type { ImgHTMLAttributes } from 'react'

export default function HoverImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <img
      {...props}
      onMouseEnter={(e) => {
        setIsHovered(true)
        if (props.onMouseEnter) props.onMouseEnter(e)
      }}
      onMouseLeave={(e) => {
        setIsHovered(false)
        if (props.onMouseLeave) props.onMouseLeave(e)
      }}
      style={{
        ...props.style,
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        transition: 'transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
        willChange: 'transform',
      }}
    />
  )
}
