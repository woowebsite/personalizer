import React from 'react';
import iconMapper from './iconMapper';
import IconStyled from './styled';

export interface BaseIconProps {
  icon: string;
  color?: string;
}

export interface IconProps {
  className?: string;
  onClick?: React.MouseEventHandler<HTMLSpanElement>;
  style?: React.CSSProperties;
  size?: number;
}

/**
 * Usage
 * <Icon icon="Refresh" />
 *
 */
const Icon = React.forwardRef<HTMLSpanElement, IconProps & BaseIconProps>(
  (props, ref) => {
    const { icon, size, className, color = '#ffffff', onClick } = props;
    const sizeIcon = size || 20;
    const classString = className
      ? `icon icon-${icon} ${className}`
      : `icon icon-${icon}`;
    const IconComp = iconMapper[icon];

    return (
      <IconStyled
        ref={ref}
        role="img"
        aria-label={icon}
        color={color}
        size={sizeIcon}
        onClick={onClick}
        className={classString}
      >
        <IconComp width={sizeIcon} height={sizeIcon} />
      </IconStyled>
    );
  },
);

Icon.displayName = 'Icon';
export default Icon;