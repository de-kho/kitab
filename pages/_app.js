/* pages/_app.js */
import { fonts } from '../lib/fonts';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from '@chakra-ui/react';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <style jsx global>
      {`
        :root {
          --font-rubik: ${fonts.rubik.style.fontFamily};
        }
      `}
    </style>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
};

export default App;
