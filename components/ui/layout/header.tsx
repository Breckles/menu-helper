import { SxProps, Theme, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';

const Header = () => {
  const theme = useTheme();

  return (
    <header>
      <Button href={'/'} disableElevation disableRipple>
        <RestaurantMenuIcon />
        Menu Helper
      </Button>
    </header>
  );
};

export default Header;
