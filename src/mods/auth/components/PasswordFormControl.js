import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons';
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  InputRightElement,
  Input,
  Icon,
} from '@chakra-ui/react';

const PasswordFormControl = ({ placeholder, label, field, error, touched }) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <FormControl isInvalid={error && touched} mt={8}>
      <FormLabel htmlFor="password">{label}</FormLabel>
      <InputGroup size="md">
        <Input
          {...field}
          pr="3rem"
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
        />
        <InputRightElement width="3rem">
          <Button h="1.75rem" size="sm" onClick={() => setShowPassword((p) => !p)}>
            {showPassword ? <Icon as={EyeInvisibleOutlined} /> : <Icon as={EyeOutlined} />}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

PasswordFormControl.propTypes = {
  field: PropTypes.object.isRequired,
  error: PropTypes.string,
  touched: PropTypes.bool,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

PasswordFormControl.defaultProps = {
  error: '',
  touched: false,
  label: 'Password',
  placeholder: 'Enter password',
};

export default PasswordFormControl;
