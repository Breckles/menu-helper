import Box from '@mui/material/Box';
import { SxProps } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import Header from './header';
import Footer from './footer';

import theme from '../../../styles/theme';

type LayoutProps = {
  children: React.ReactNode;
};

const layoutStyles: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  padding: {
    mobile: `${theme.spacing(1)}`,
  },
  width: '100vw',
  height: '100vh',
};

const mainStyles = {
  flex: '1 1 100%',
  display: 'flex',
  flexDirection: 'column',
  // width: '100%',
  // height: '100%',
};

const Layout = (props: LayoutProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Box className="layout" sx={layoutStyles}>
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
