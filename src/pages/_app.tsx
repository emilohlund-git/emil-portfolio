import { socket, SocketContext } from '@/context/socket';
import Layout from '@/modules/layout';
import { Container, Loader, MantineProvider } from '@mantine/core';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { store } from '../redux/store';
import '../styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const persistor = persistStore(store);

  return (
    <SocketContext.Provider value={socket}>
      <Provider store={store}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            /** Put your mantine theme override here */
            colorScheme: 'light',
          }}
        >
          <Layout>
            <PersistGate loading={<Container className="w-full justify-center items-center flex h-96"><Loader /></Container>} persistor={persistor}>
              <Component {...pageProps} />
            </PersistGate>
          </Layout>
        </MantineProvider>
      </Provider>
    </SocketContext.Provider>
  )
}

export default MyApp
