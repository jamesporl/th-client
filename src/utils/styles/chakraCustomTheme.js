import { extendTheme } from '@chakra-ui/react';
import { StepsStyleConfig as Steps } from 'chakra-ui-steps';

export default extendTheme({
  colors: {
    green: {
      50: '#F2F6EE',
      100: '#D9E7D0',
      200: '#C1D7B2',
      300: '#A9C794',
      400: '#91B875',
      500: '#78A857',
      600: '#608646',
      700: '#486534',
      800: '#304323',
      900: '#182211',
    },
  },
  components: {
    Steps,
  },
});
