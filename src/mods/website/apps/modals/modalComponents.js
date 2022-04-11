import dynamic from 'next/dynamic';
import dynamicLoaderOptions from 'core/utils/dynamicLoaderOptions';

const NewAppForm = dynamic(() => import('./NewAppForm'), dynamicLoaderOptions);

export default {
  newAppForm: NewAppForm,
};
