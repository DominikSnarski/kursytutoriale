import apiClient from '../ApiClient';

export const PaymentService = {
    newPayment: (courseId, name, surname, cardNumber, expirationDateMonth, expirationDateYear, cvv) => {
        return new Promise((resolve, reject) =>
          apiClient
            .post('/api/CreditCardPayment/PayForCourseAccess', {
                courseId, 
                name, 
                surname, 
                cardNumber, 
                expirationDateMonth, 
                expirationDateYear, 
                cvv
            })
            .then((resp) => resolve(resp))
            .catch((error) => reject(error)),
        );
      }
};
export default PaymentService;