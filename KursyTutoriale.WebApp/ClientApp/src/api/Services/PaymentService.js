import apiClient from '../ApiClient';

export const PaymentService = {
  newPayment: (
    courseId,
    ownerFirstName,
    ownerLastName,
    number,
    expMonth,
    expYear,
    cvv,
    addCardToList,
  ) => {
    return new Promise((resolve, reject) =>
      apiClient
        .post(
          `/api/CreditCardPayment/PayForCourseAccess?courseId=${courseId}`,
          {
            ownerFirstName,
            ownerLastName,
            number,
            expMonth,
            expYear,
            cvv,
            addCardToList,
          },
        )
        .then((resp) => resolve(resp))
        .catch((error) => reject(error)),
    );
  },
  getCreditCards: () =>
    new Promise((resolve, reject) =>
      apiClient
        .get(`api/PaymentCustomer/GetCreditCards`)
        .then((res) => resolve(res.data))
        .catch((error) => reject(error)),
    ),
  getTransactions: () =>
    new Promise((resolve, reject) =>
      apiClient
        .get(`/api/PaymentCustomer/GetTransactions`)
        .then((res) => resolve(res.data))
        .catch((error) => reject(error)),
    ),
};
export default PaymentService;
