import dynamic from 'next/dynamic';
import dynamicLoaderOptions from 'core/utils/dynamicLoaderOptions';

const AppDraftsSearchComp = dynamic(
  () => import('../../mods/admin/appDrafts/containers/components/AppDraftsSearch'),
  dynamicLoaderOptions,
);

export default {
  appDrafts: AppDraftsSearchComp,
};
