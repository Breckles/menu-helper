import { createTheme } from '@mui/material/styles';

// Using module augmentation to remove default breakpoints and define custom
// ones. (necessary for TypeScript)
declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false; // removes the `xs` breakpoint
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true; // adds the `mobile` breakpoint
    tablet: true;
    desktop: true;
  }
}

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 375,
      tablet: 750,
      desktop: 1440,
    },
  },
});

export default theme;
