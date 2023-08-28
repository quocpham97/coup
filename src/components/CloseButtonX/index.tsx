/* eslint-disable react/require-default-props */
import Close from '@mui/icons-material/Close';
import { SxProps, Theme } from '@mui/material';

export default function CloseButtonX({
  closeButtonSx,
  onClose,
}: {
  closeButtonSx?: SxProps<Theme>;
  onClose: () => void;
}) {
  return (
    <Close
      sx={{
        position: 'absolute',
        right: '24px',
        width: '22px',
        height: '22px',
        cursor: 'pointer',
        color: 'black.main',
        zIndex: '1',
        ':hover': { transform: 'scale(1.2)', color: 'primary10.main' },
        ':active': { transform: 'scale(0.9)', color: 'primary10.main' },
        transition: 'all 0.1s ease-in-out',
        ...closeButtonSx,
      }}
      onClick={onClose}
    />
  );
}
