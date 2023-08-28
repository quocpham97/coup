/* eslint-disable arrow-body-style */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/require-default-props */
import MuiTypography, { TypographyProps as MuiTypographyProps } from '@mui/material/Typography';
import { Breakpoint } from '@mui/material/styles';

export type Responsive<T> = T | Partial<Record<Breakpoint, T>>;

// 10 12 14 16 18 20 24 32 40 48
export type FontSize = 'tiny' | 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl';

// 400 500 600 700 900
export type FontWeight = 'regular' | 'medium' | 'semibold' | 'bold' | 'black';

export type TypographyBase = {
  fontSize: Responsive<FontSize>;
  fontWeight?: Responsive<FontWeight>;
  as?: React.ElementType;
};

export type TypographyProps = MuiTypographyProps & TypographyBase;

export const Typography = ({ children, fontSize, fontWeight, ...props }: TypographyProps) => {
  return (
    <MuiTypography
      fontSize={fontSize}
      fontWeight={fontWeight}
      lineHeight={fontWeight === 'bold' ? '125%' : '150%'}
      {...props}
    >
      {children}
    </MuiTypography>
  );
};
