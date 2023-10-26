import useAsync from '../useAsync';

import * as eventApi from '../../services/eventApi';

export default function useLogo() {
  const {
    data: logo,
    loading: logoLoading,
    error: logoError,
  } = useAsync(eventApi.getEventLogo);

  return {
    logo,
    logoLoading,
    logoError,
  };
}
