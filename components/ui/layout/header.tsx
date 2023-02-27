import { SxProps, Theme, useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import Typography from '@mui/material/Typography';

const Header = () => {
  const theme = useTheme();

  const styles = {
    display: 'flex',
    justifyContent: { mobile: 'center', tablet: 'flex-start' },
    '.MuiButton-root': {
      gap: theme.spacing(2),
    },
    padding: {
      mobile: `${theme.spacing(1)} 0 ${theme.spacing(2)}`,
      tablet: `${theme.spacing(1)} 0 ${theme.spacing(3)}`,
    },
  };

  return (
    <Box component={'header'} sx={styles}>
      <Button href={'/'} disableElevation disableRipple>
        <RestaurantMenuIcon />
        <Typography variant="h1">Menu Helper</Typography>
      </Button>
    </Box>
  );
};

export default Header;
