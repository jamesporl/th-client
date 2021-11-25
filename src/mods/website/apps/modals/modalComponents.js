import dynamic from 'next/dynamic';
import dynamicLoaderOptions from 'core/utils/globalModal/dynamicLoaderOptions';

const NewAppForm = dynamic(() => import('./NewAppForm'), dynamicLoaderOptions);

export default {
  newAppForm: NewAppForm,
};
