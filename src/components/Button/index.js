import { Link } from 'react-router-dom'
import classNames from 'classnames/bind'
import styles from './Button.module.scss'

const cx = classNames.bind(styles)

function Button({
    to,
    href,
    primary = false,
    outline = false,
    text = false,
    disable = false,
    small = false,
    large = false,
    exlarge = false,
    children,
    onClick,
    ...passProps
}) {
    let Compnt = 'button'
    const props = {
        onClick,
        ...passProps,
    }

    // Remove event listener when button is disable
    if (disable) {
        Object.keys(props).forEach((key) => {
            if (key.startsWith('on') && typeof props[key] === 'function') delete props[key]
        })
    }

    if (to) {
        props.to = to
        Compnt = Link
    } else if (href) {
        props.href = href
        Compnt = 'a'
    }

    const classes = cx('wrapper', {
        primary,
        outline,
        text,
        disable,
        small,
        large,
        exlarge,
    })
    return (
        <Compnt className={classes} {...props}>
            <span>{children}</span>
        </Compnt>
    )
}

export default Button
