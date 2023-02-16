import { SxProps, Theme, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

const sx: SxProps<Theme> = {
  '&:hover': {
    backgroundColor: 'transparent',
  },
};

const Header = () => {
  const theme = useTheme();

  sx.gap = theme.spacing(2);

  return (
    <header>
      <Button href={'/'} sx={sx} disableElevation disableRipple>
        <RestaurantMenuIcon />
        Menu Helper
      </Button>
    </header>
  );
};

export default Header;
