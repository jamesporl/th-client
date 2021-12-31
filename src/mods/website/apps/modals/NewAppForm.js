import React from 'react';
import { useMutation } from '@apollo/client';
import {
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Flex,
  useToast,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import * as yup from 'yup';
import useStores from 'core/stores/useStores';
import AddAppMtn from '../gql/AddAppMtn';

const NewAppSchema = yup.object().shape({
  name: yup.string().max(50, 'Too long').required('Name of app is required'),
  shortDesc: yup.string().max(80, 'Too long').required('Short description is required'),
});

function NewAppForm() {
  const { uiStore } = useStores();
  const toast = useToast();
  const router = useRouter();
  const [addApp] = useMutation(AddAppMtn);

  const handleSubmitAddForm = async (values) => {
    const { name, shortDesc } = values;
    const input = { name, shortDesc };
    try {
      const { data } = await addApp({ variables: { input } });
      uiStore.closeGlobalModal();
      router.push(`/my/apps/edit/${data.addApp._id}`);
    } catch (error) {
      toast({ position: 'top', status: 'error', variant: 'subtle', description: error.message });
    }
  };

  return (
    <Formik
      validationSchema={NewAppSchema}
      onSubmit={handleSubmitAddForm}
      initialValues={{ name: '', shortDesc: '' }}
    >
      {({ errors, touched, isSubmitting }) => (
        <Form>
          <Field name="name">
            {({ field }) => (
              <FormControl isInvalid={errors.name && touched.name}>
                <FormLabel htmlFor="name">Name of app</FormLabel>
                <Input {...field} id="name" />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name="shortDesc">
            {({ field }) => (
              <FormControl isInvalid={errors.shortDesc && touched.shortDesc} mt={8}>
                <FormLabel htmlFor="shortDesc">Short description / Slogan</FormLabel>
                <Input {...field} id="shortDesc" />
                <FormErrorMessage>{errors.shortDesc}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Flex justifyContent="flex-end" mt={16}>
            <Button colorScheme="blue" mr={2} onClick={uiStore.closeGlobalModal} variant="outline">
              Cancel
            </Button>
            <Button colorScheme="blue" type="submit" isLoading={isSubmitting}>
              Submit
            </Button>
          </Flex>
        </Form>
      )}
    </Formik>
  );
}

export default observer(NewAppForm);
