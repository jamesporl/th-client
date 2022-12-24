import React from 'react';
import { useQuery } from '@apollo/client';
import { Box, Button, HStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { ArrowRightOutlined, CloseOutlined } from '@ant-design/icons';
import useStores from 'core/stores/useStores';
import AppDetails from 'mods/website/components/AppDetails';
import AppQry from '../gql/AppQry';

const AppDetailsModal = () => {
  const router = useRouter();

  const { uiStore } = useStores();

  const { slug } = uiStore.globalModalParams.context;

  const { data } = useQuery(AppQry, { variables: { slug } });

  const handleClickCloseModal = () => {
    uiStore.closeGlobalModal();
    window.history.replaceState(null, '', router.asPath);
  };

  const handleClickGoToPage = () => {
    uiStore.closeGlobalModal();
    router.push(`/apps/${slug}`);
  };

  let appDetails = null;
  if (data) {
    appDetails = (
      <>
        <HStack spacing={4}>
          <Button
            variant="link"
            leftIcon={<CloseOutlined />}
            colorScheme="blue"
            onClick={handleClickCloseModal}
          >
            Close
          </Button>
          <Button
            variant="link"
            leftIcon={<ArrowRightOutlined />}
            colorScheme="blue"
            onClick={handleClickGoToPage}
          >
            Go to Page
          </Button>
        </HStack>
        <Box mt={12}>
          <AppDetails app={data.app} isPreview={false} />
        </Box>
      </>
    );
  }
  return appDetails;
};

AppDetailsModal.propTypes = {};

AppDetailsModal.defaultProps = {};

export default AppDetailsModal;
