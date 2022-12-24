import dynamic from 'next/dynamic';
import dynamicLoaderOptions from 'core/utils/dynamicLoaderOptions';
import AppDetailsModal from './AppDetailsModal';

const NewAppForm = dynamic(() => import('./NewAppForm'), dynamicLoaderOptions);

export default {
  newAppForm: NewAppForm,
  appDetails: AppDetailsModal,
};
