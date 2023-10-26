import useAsync from '../useAsync';

import * as registerApi from '../../services/registerApi';
import useToken from '../useToken';

export default function useRegister() {

  const token = useToken();

  const {
    data: register,
    loading: registerLoading,
    error: registerError,
  } = useAsync(() => registerApi.getUserRegister(token));

  return {
    register,
    registerLoading,
    registerError,
  };
}
