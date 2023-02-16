import { Box } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

import Header from './header';
import Footer from './footer';

import theme from './theme';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = (props: LayoutProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Header />
        <main>{props.children}</main>
        <Footer />
      </Box>
    </ThemeProvider>
  );
};

export default Layout;
