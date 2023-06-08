import dynamic from 'next/dynamic';
import dynamicLoaderOptions from 'core/utils/dynamicLoaderOptions';

const CropImage = dynamic(() => import('./CropImage'), dynamicLoaderOptions);

const ConfirmDeleteApp = dynamic(() => import('./ConfirmDeleteApp'), dynamicLoaderOptions);

const ConfirmDeleteAppDraft = dynamic(
  () => import('./ConfirmDeleteAppDraft'),
  dynamicLoaderOptions,
);

export default {
  confirmDeleteAppDraft: ConfirmDeleteAppDraft,
  confirmDeleteApp: ConfirmDeleteApp,
  cropImage: CropImage,
};
