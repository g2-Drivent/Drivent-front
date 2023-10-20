import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';

export default function useBooking() {
  const token = useToken();

  const {
    loading: bookingLoading,
    error: bookingError,
    act: createBooking
  } = useAsync((roomId) => bookingApi.createBooking(roomId, token), false);

  return {
    bookingLoading,
    bookingError,
    createBooking
  };
}
