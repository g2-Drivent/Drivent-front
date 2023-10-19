import { createContext, useState } from "react";

export const PaymentDataContext = createContext();

export const PaymentProvider = ({ children }) => {

  const [enrollment, setEnrollment] = useState(false);
  const [modalityEnrollment, setModalityEnrollment] = useState('');
  const [modalityAccommodation, setModalityAccommodation] = useState('');
  const [total, setTotal] = useState(0);
  const [payment, setPayment] = useState(true);

  return (
    <PaymentDataContext.Provider value={{
        enrollment, setEnrollment,
        modalityEnrollment, setModalityEnrollment,
        modalityAccommodation, setModalityAccommodation,
        total, setTotal,
        payment, setPayment
     }}>
      {children}
    </PaymentDataContext.Provider>
  )
}