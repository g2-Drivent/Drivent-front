import useAsync from "../useAsync";
import * as authApi from '../../services/authApi';

export default function useGitHubSign(){
    const {
        loading: signInLoading,
        error: signInError,
        act: signIn
      } = useAsync((code)=> authApi.signWithGitHub(code), false);

      return {
        signInLoading,
        signInError,
        signIn
      };
}