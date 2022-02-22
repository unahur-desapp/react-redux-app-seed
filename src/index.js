import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {
  CircularProgress,
  CssBaseline,
  ThemeProvider,
} from '@mui/material';
import theme from './theme';
import { ErrorBoundary } from 'react-error-boundary';
import { Alert } from '@mui/material';

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <React.StrictMode>
      <CssBaseline />
        <Suspense fallback={<CircularProgress />}>
          <ErrorBoundary
            fallback={<Alert severity="error">Algo se rompió feo :(</Alert>}
          >
            <App />
          </ErrorBoundary>
        </Suspense>
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById('root')
);

