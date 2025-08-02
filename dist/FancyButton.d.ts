import React from 'react';
export type Variant = '3d' | 'flat' | 'outline' | 'text';
export type Appearance = '3d' | 'classic';
export type Size = 'small' | 'medium' | 'large';
export interface FancyButtonProps {
    children?: React.ReactNode;
    variant?: Variant;
    appearance?: Appearance;
    size?: Size;
    backgroundColor?: string;
    color?: string;
    borderColor?: string;
    hoverColor?: string;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
    iconOnly?: boolean;
    disabled?: boolean;
    ripple?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    fullWidth?: boolean;
    maxWidth?: string | number;
    className?: string;
    style?: React.CSSProperties;
    [key: string]: unknown;
}
declare const FancyButton: React.FC<FancyButtonProps>;
export default FancyButton;
//# sourceMappingURL=FancyButton.d.ts.map