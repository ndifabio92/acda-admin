import { FC, MouseEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { Menu as MenuIcon, Logout } from '@mui/icons-material';
import { AppHeaderProps } from '../types/ui/appHeader';
import { useAuth } from '../context/hooks/useAuth';
export const AppHeader: FC<AppHeaderProps> = ({ handleDrawerToggle }) => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
    handleClose();
  };

  const userEmail = user?.email || '';
  const userInitial = user?.name;
  const avatarUrl = 'https://api.dicebear.com/5.x/thumbs/svg?seed=' + userEmail;

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex: theme.zIndex.drawer + 1,
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{
            flexGrow: 1,
            fontWeight: 600,
            letterSpacing: '0.5px',
          }}
        >
          Asociación Civil Deportiva Airsoft
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            src={avatarUrl}
            sx={{
              width: 38,
              height: 38,
              border: '2px solid #ffffff',
            }}
          ></Avatar>
          <Tooltip title={userEmail}>
            <IconButton
              size="large"
              aria-label="cuenta del usuario"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              sx={{
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              {userInitial}
            </IconButton>
          </Tooltip>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            slotProps={{
              paper: {
                elevation: 3,
                sx: {
                  mt: 1.5,
                  minWidth: 180,
                  overflow: 'visible',
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              },
            }}
          >
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" color="error" />
              </ListItemIcon>
              <Typography variant="body2">Cerrar sesión</Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
