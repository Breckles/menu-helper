import { Box } from '@mui/material';
import { ThemeProvider, Theme, SxProps } from '@mui/material/styles';

import Header from './header';
import Footer from './footer';

import theme from './theme';

type LayoutProps = {
  children: React.ReactNode;
};

const sx: SxProps<Theme> = {
  display: 'flex',
};

const Layout = (props: LayoutProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Box sx={sx}>
        <Header />
        <main>{props.children}</main>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
