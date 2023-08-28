/* eslint-disable react/require-default-props */
import { Box, CircularProgress } from '@mui/material';
import MuiButton, { ButtonProps } from '@mui/material/Button';
import { CSSProperties } from 'react';
import { Typography } from '../Typography';

type ButtonCommonProps = {
  sxDisable?: CSSProperties;
  loadingText?: string;
  sxLoadingText?: CSSProperties;
  isLoading?: boolean;
};

export function Button({
  children,
  variant,
  sx,
  sxDisable = {},
  loadingText,
  sxLoadingText,
  isLoading = false,
  ...props
}: ButtonProps & ButtonCommonProps) {
  return (
    <MuiButton
      color="primary"
      variant={variant || 'contained'}
      sx={{
        textTransform: 'none',
        '&.Mui-disabled': {
          background: '#CBD5E0',
          color: 'white.main',
          ...sxDisable,
        },
        ...sx,
      }}
      {...props}
    >
      {!isLoading && children}
      {isLoading && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <CircularProgress size={20} sx={{ color: 'currentColor' }} />
          {loadingText && (
            <Typography fontSize="sm" fontWeight="bold" sx={{ color: '#F05C22', ...sxLoadingText }}>
              {loadingText}
            </Typography>
          )}
        </Box>
      )}
    </MuiButton>
  );
}

export default Button;
