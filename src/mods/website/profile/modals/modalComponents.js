import dynamic from 'next/dynamic';
import dynamicLoaderOptions from 'core/utils/dynamicLoaderOptions';

const CropImage = dynamic(() => import('./CropImage'), dynamicLoaderOptions);

export default {
  cropImage: CropImage,
};
