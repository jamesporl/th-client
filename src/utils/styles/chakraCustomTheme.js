import { extendTheme } from '@chakra-ui/react';
import { StepsStyleConfig } from 'chakra-ui-steps';
import modalTheme from './modalTheme';

const CustomSteps = {
  ...StepsStyleConfig,
  baseStyle: (props) => {
    const baseStyle = StepsStyleConfig.baseStyle(props);
    return {
      ...baseStyle,
      stepIconContainer: {
        ...baseStyle.stepIconContainer,
        _activeStep: {
          ...baseStyle.stepIconContainer._activeStep, // eslint-disable-line no-underscore-dangle
          bg: '#fff',
        },
      },
    };
  },
};

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
    Steps: CustomSteps,
    Modal: modalTheme,
  },
});
