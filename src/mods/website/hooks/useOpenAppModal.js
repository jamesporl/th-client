import useStores from 'core/stores/useStores';
import { useRouter } from 'next/router';

const useOpenAppModal = (slug) => {
  const { uiStore } = useStores();

  const router = useRouter();

  return () => {
    window.history.replaceState(null, '', `/apps/${slug}`);
    uiStore.openGlobalModal(
      'appDetails',
      null,
      { slug },
      {
        size: 'xl',
        autoFocus: false,
        onClose: () => {
          uiStore.closeGlobalModal();
          window.history.replaceState(null, '', router.asPath);
        },
      },
    );
  };
};

export default useOpenAppModal;
