import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';

import GlobalStyles from '@/styles/GlobalStyle.js';
import theme from '@/styles/theme.js';

import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <GlobalStyles />
    <App />
  </ThemeProvider>
);
