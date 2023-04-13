import { useState, forwardRef } from 'react'
import classNames from 'classnames'
import images from '~/assets/images'
import styles from './Image.module.scss'

const Image = ({ src, alt, className, fallback: customFb = images.noImage, ...props }, ref) => {
    const [fallback, setFallback] = useState('')
    const handleError = () => {
        setFallback(customFb)
    }
    return (
        <img
            ref={ref}
            {...props}
            className={classNames(styles.wrapper, className)}
            src={fallback || src}
            alt={alt}
            onError={handleError}
        />
    )
}

export default forwardRef(Image)
