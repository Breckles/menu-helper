import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import Header from './header';
import Footer from './footer';

import theme from '../../../styles/theme';

type LayoutProps = {
  children: React.ReactNode;
};

const layoutStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  padding: {
    mobile: `${theme.spacing(1)} 0`,
  },
  minHeight: '100vh',
};

const mainStyles = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '100vw',
};

const Layout = (props: LayoutProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={layoutStyles}>
        <Header />
        <Box component={'main'} sx={mainStyles}>
          {props.children}
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
