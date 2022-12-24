import { modalAnatomy as parts } from '@chakra-ui/anatomy';
import { defineStyle, createMultiStyleConfigHelpers } from '@chakra-ui/styled-system';

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts.keys);

const xlDialog = defineStyle({
  maxWidth: '1148px',
});

const xlBody = defineStyle({
  paddingTop: '32px',
  paddingBottom: '32px',
});

const sizes = {
  xl: definePartsStyle({ dialog: xlDialog, body: xlBody }),
};

const modalTheme = defineMultiStyleConfig({
  sizes,
});

export default modalTheme;
