import React from "react";
export const LeftArrow   = ({
    fill = 'currentColor',
    filled,
    size,
    height,
    width,
    label,
    ...props
  }) => {
  return (
    <svg class="with-icon_icon__MHUeb" data-testid="geist-icon" fill="none"  width={size || width || 16}
    height={size || height || 16}shape-rendering="geometricPrecision" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>
  );
};
