/* eslint-disable react/require-default-props */
import { Dialog, SxProps, Theme, Box, Button as ButtonMui } from '@mui/material';
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';
import { Typography } from '../Typography';
import { Button } from '../Button';
import CloseButtonX from '../CloseButtonX';

export default function ModalCustom({
  isOpen,
  onClose,
  title,
  containerSx,
  headerSx,
  headerTextSx,
  headerComponent,
  closeButtonSx,
  backButtonSx,
  bodySx,
  children,
  childrenButton,
  contentButton,
  actionButton,
  contentButtonSecondary,
  actionButtonSecondary,
  buttonSx,
  disableAction,
  sxDialog,
  onBack,
}: {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  containerSx?: SxProps<Theme> | undefined;
  headerSx?: SxProps<Theme> | undefined;
  headerTextSx?: SxProps<Theme> | undefined;
  headerComponent?: JSX.Element;
  closeButtonSx?: SxProps<Theme> | undefined;
  backButtonSx?: SxProps<Theme> | undefined;
  bodySx?: SxProps<Theme> | undefined;
  children?: JSX.Element;
  childrenButton?: JSX.Element;
  contentButton?: JSX.Element | string;
  actionButton?: () => unknown;
  contentButtonSecondary?: JSX.Element | string;
  actionButtonSecondary?: () => unknown;
  buttonSx?: SxProps<Theme>;
  disableAction?: boolean;
  sxDialog?: SxProps<Theme>;
  onBack?: () => unknown;
}) {
  return (
    <Dialog
      open={isOpen}
      maxWidth={false}
      sx={{ zIndex: (theme) => theme.zIndex.modal }}
      PaperProps={{
        sx: {
          background: 'transparent',
          borderRadius: '16px',
          margin: '0px',
          maxWidth: '100%',
          marginX: { xs: '10px', md: '20px', xl: '32px' },
          ...sxDialog,
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'column nowrap',
          backgroundColor: 'white.main',
          width: '488px',
          maxWidth: '100%',
          overflow: 'hidden',
          ...containerSx,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            paddingX: '24px',
            paddingY: '16px',
            borderBottom: title ? '1px solid #F3F3F4' : '',
            ...headerSx,
          }}
        >
          {onBack && (
            <KeyboardBackspaceRoundedIcon
              sx={{
                position: 'absolute',
                left: '24px',
                width: '22px',
                height: '22px',
                cursor: 'pointer',
                color: 'black.main',
                zIndex: '1',
                ':hover': { transform: 'scale(1.1)', color: 'primary10.main' },
                ':active': { transform: 'scale(0.9)', color: 'primary10.main' },
                transition: 'all 0.2s ease-in-out',
                ...backButtonSx,
              }}
              onClick={onBack}
            />
          )}
          {headerComponent || (
            <Typography
              fontSize="xl"
              fontWeight="bold"
              sx={{ lineHeight: '150%', textAlign: 'center', ...headerTextSx }}
            >
              {title ?? ''}
            </Typography>
          )}
          <CloseButtonX closeButtonSx={closeButtonSx} onClose={onClose} />
        </Box>
        <Box
          sx={{
            overflowY: 'auto',
            '::-webkit-scrollbar': {
              width: '6px',
              background: '#EDF2F7',
              borderRadius: '100px',
            },
            '::-webkit-scrollbar-thumb': {
              width: '6px',
              background: '#CBD5E0',
              borderRadius: '100px',
            },
            ...bodySx,
          }}
        >
          {children}
        </Box>
        {contentButton && (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              paddingY: '20px',
              gap: '8px',
            }}
          >
            <Button
              disabled={!!disableAction}
              sx={buttonSx}
              onClick={() => {
                actionButton && actionButton();
              }}
            >
              {contentButton}
            </Button>
            {contentButtonSecondary && (
              <ButtonMui
                sx={{
                  fontWeight: 700,
                  fontSize: '14px',
                  lineHeight: '20px',
                }}
                onClick={() => {
                  actionButtonSecondary && actionButtonSecondary();
                }}
              >
                {contentButtonSecondary}
              </ButtonMui>
            )}
          </Box>
        )}
        {childrenButton}
      </Box>
    </Dialog>
  );
}
