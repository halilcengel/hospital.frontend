import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';

import CssBaseline from '@mui/material/CssBaseline';
import PropTypes from 'prop-types';
import React from 'react';
import { customShadows } from './custom-shadows';
import { overrides } from './overrides';
import { palette } from './palette';
import { shadows } from './shadows';
import { typography } from './typography';
import { useMemo } from 'react';

// ----------------------------------------------------------------------

export default function ThemeProvider({ children }) {
  const memoizedValue = useMemo(
    () => ({
      palette: palette(),
      typography,
      shadows: shadows(),
      customShadows: customShadows(),
      shape: { borderRadius: 8 },
    }),
    []
  );

  const theme = createTheme(memoizedValue);

  theme.components = overrides(theme);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node,
};
