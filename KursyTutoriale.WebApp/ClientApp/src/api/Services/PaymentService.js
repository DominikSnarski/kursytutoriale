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
          },
        )
        .then((resp) => resolve(resp))
        .catch((error) => reject(error)),
    );
  },
};
export default PaymentService;
