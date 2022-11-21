import { useApolloClient } from '@apollo/client';
import useStores from 'core/stores/useStores';
import { useRouter } from 'next/router';
import MyAppDraftsQry from 'mods/website/profile/gql/MyAppDraftsQry';

const useClickSubmitAnApp = () => {
  const { authStore, uiStore } = useStores();

  const apolloClient = useApolloClient();

  const router = useRouter();

  return async () => {
    if (authStore.myProfile) {
      const { data } = await apolloClient.query({
        query: MyAppDraftsQry,
        fetchPolicy: 'network-only',
      });
      const appDrafts = data.myAppDrafts.nodes;
      const inProgressDrafts = appDrafts.filter((a) => a.status.key === 'inProgress');
      if (inProgressDrafts.length === 1) {
        router.push(`/my/apps/edit/${appDrafts[0].appId}`);
        return;
      }
      if (appDrafts.length > 0) {
        router.push('/my/apps');
        return;
      }
      uiStore.openGlobalModal('newAppForm', 'New App');
    } else {
      window.location.href = '/account/login';
    }
  };
};

export default useClickSubmitAnApp;
