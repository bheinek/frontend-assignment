import {ChakraProvider} from '@chakra-ui/react';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import {HelmetProvider} from 'react-helmet-async';
import {Provider} from 'react-redux';
import {RouterProvider} from 'react-router-dom';
import {store} from '@/app/store';
import {toaster} from '@/utils/toaster';
import GlobalStyles from '@/GlobalStyles';
import WebVitals from '@/WebVitals';
import '@/i18n/i18n';
import theme from '@/theme';
import {router} from '@/router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ChakraProvider value={theme}>
        <HelmetProvider>
          <RouterProvider router={router} />
          <toaster.Toaster />
          <GlobalStyles />
          <WebVitals showStatusInConsoleLog />
        </HelmetProvider>
      </ChakraProvider>
    </Provider>
  </StrictMode>
);
