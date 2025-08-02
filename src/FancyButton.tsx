import React, { useRef, useState } from 'react';
import './FancyButton.css';

// Tipos exportados para compatibilidad total
export type Variant = '3d' | 'flat' | 'outline' | 'text';
export type Appearance = '3d' | 'classic';
export type Size = 'small' | 'medium' | 'large';

// Interface más flexible que puede funcionar sin TypeScript estricto
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
  // Propiedades adicionales para máxima flexibilidad
  className?: string;
  style?: React.CSSProperties;
  [key: string]: unknown; // Permite propiedades adicionales
}

// Función helper para validar React (útil para debugging)
const checkReactAvailability = () => {
  if (typeof React === 'undefined') {
    console.warn('FancyButton: React no está disponible. Asegúrate de que React esté instalado.');
    return false;
  }
  return true;
};

const FancyButton: React.FC<FancyButtonProps> = (props) => {
  // Destructuring con valores por defecto más robustos
  const {
    children = "Button",
    variant = "3d",
    appearance = "3d",
    size = "medium",
    backgroundColor,
    color,
    borderColor,
    hoverColor,
    startIcon,
    endIcon,
    iconOnly = false,
    disabled = false,
    ripple = true,
    onClick,
    fullWidth = false,
    maxWidth,
    className = '',
    style: externalStyle = {},
    ...otherProps
  } = props;

  // Verificación de React en desarrollo
  if (typeof process !== 'undefined' && process.env?.NODE_ENV === 'development') {
    checkReactAvailability();
  }

  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isActive, setIsActive] = useState(false);

  // Utilidad para obtener color con opacidad - más robusta
  const getRGBA = (hex: string, alpha: number): string => {
    if (!hex || typeof hex !== 'string') return '';
    try {
      let c = hex.replace('#', '');
      if (c.length === 3) c = c.split('').map(x => x + x).join('');
      if (c.length !== 6) return '';
      const num = parseInt(c, 16);
      if (isNaN(num)) return '';
      return `rgba(${(num >> 16) & 255},${(num >> 8) & 255},${num & 255},${alpha})`;
    } catch (error) {
      console.warn('FancyButton: Error procesando color', hex, error);
      return '';
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    
    const button = buttonRef.current;
    if (!button || !ripple) {
      if (onClick) onClick(e);
      return;
    }

    try {
      const rippleEl = document.createElement('span');
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      rippleEl.style.width = rippleEl.style.height = `${size}px`;
      rippleEl.style.left = `${x}px`;
      rippleEl.style.top = `${y}px`;
      rippleEl.className = 'rippleAnimation';
      
      button.appendChild(rippleEl);
      
      setTimeout(() => {
        try {
          if (rippleEl && rippleEl.parentNode) {
            rippleEl.remove();
          }
        } catch (cleanupError) {
          console.warn('FancyButton: Error limpiando ripple', cleanupError);
        }
      }, 1200);
    } catch (rippleError) {
      console.warn('FancyButton: Error creando efecto ripple', rippleError);
    }
    
    if (onClick) onClick(e);
  };

  // Estilos dinámicos más robustos
  let internalStyle: React.CSSProperties = {
    background: backgroundColor || undefined,
    color: color || undefined,
    border: (variant === '3d' || variant === 'outline' || borderColor)
      ? `2px solid ${borderColor || (variant === '3d' ? '#016bd6' : variant === 'outline' ? '#0173e6' : 'transparent')}`
      : 'none',
    boxSizing: 'border-box',
    width: 'auto',
    maxWidth: 'none',
    minWidth: 0,
  };

  if (fullWidth) {
    internalStyle.width = '100%';
    internalStyle.display = 'block';
  }
  
  if (maxWidth) {
    internalStyle.maxWidth = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth;
  }

  // Para variante text: solo color de texto en hover, fondo solo en active
  if (variant === 'text') {
    const hoverColorValue = hoverColor || '#00b4d8';
    internalStyle = {
      ...internalStyle,
      '--hover-color': hoverColorValue,
      '--active-bg': hoverColor ? getRGBA(hoverColor, 0.15) : 'rgba(0,180,216,0.15)',
      color: isHovered && hoverColor ? hoverColor : color,
      background: isActive && hoverColor
        ? getRGBA(hoverColor, 0.15)
        : 'transparent',
      border: 'none',
      boxShadow: 'none',
      textShadow: 'none',
      transition: 'color 0.2s, background 0.2s',
    } as React.CSSProperties;
  }

  // Para appearance classic
  if (appearance === 'classic') {
    internalStyle = {
      ...internalStyle,
      '--classic-hover': hoverColor || color || '#0ea5e9',
      '--classic-border': borderColor || color || '#0ea5e9',
      '--classic-bg': backgroundColor || 'transparent',
      transition: 'color 0.3s, border-color 0.3s, background 0.3s',
    } as React.CSSProperties;
  }

  // Combinar estilos externos con internos
  const finalStyle = { ...internalStyle, ...externalStyle };

  // Clases CSS más robustas
  const classes = [
    'custom-button',
    `variant-${variant}`,
    `size-${size}`,
    appearance === 'classic' ? 'appearance-classic' : '',
    disabled ? 'disabled' : '',
    iconOnly ? 'icon-only' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      ref={buttonRef}
      className={classes}
      style={finalStyle}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsActive(false);
      }}
      onMouseDown={() => setIsActive(true)}
      onMouseUp={() => setIsActive(false)}
      disabled={disabled}
      {...otherProps}
    >
      {startIcon && <span className="btn-icon start">{startIcon}</span>}
      {!iconOnly && <span className="btn-label">{children}</span>}
      {endIcon && <span className="btn-icon end">{endIcon}</span>}
    </button>
  );
};

export default FancyButton;