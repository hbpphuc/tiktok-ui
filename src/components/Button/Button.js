import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
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
    rounded = false,
    circle = false,
    small = false,
    large = false,
    exlarge = false,
    className,
    children,
    leftIcon,
    rightIcon,
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
        [className]: className,
        primary,
        outline,
        text,
        disable,
        rounded,
        circle,
        small,
        large,
        exlarge,
    })
    return (
        <Compnt className={classes} {...props}>
            {leftIcon && <span className={cx('icon')}>{leftIcon}</span>}
            <span className={cx('title')}>{children}</span>
            {rightIcon && <span className={cx('icon')}>{rightIcon}</span>}
        </Compnt>
    )
}

Button.propTypes = {
    to: PropTypes.string,
    href: PropTypes.string,
    primary: PropTypes.bool,
    outline: PropTypes.bool,
    text: PropTypes.bool,
    disable: PropTypes.bool,
    rounded: PropTypes.bool,
    circle: PropTypes.bool,
    small: PropTypes.bool,
    large: PropTypes.bool,
    exlarge: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    leftIcon: PropTypes.node,
    rightIcon: PropTypes.node,
    onClick: PropTypes.func,
}

export default Button
