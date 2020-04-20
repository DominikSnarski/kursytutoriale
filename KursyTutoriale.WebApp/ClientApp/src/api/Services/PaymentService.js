import apiClient from '../ApiClient';

export const PaymentService = {
    newPayment: (courseId, userId, name, surname, cardNumber, expirationDate, cvv) => {
        return new Promise((resolve, reject) =>
          apiClient
            .post('/api/CreditCardPayment/PayForCourseAccess', {
                courseId, 
                name, 
                surname, 
                cardNumber, 
                expirationDate, 
                cvv
            })
            .then((resp) => resolve(resp))
            .catch((error) => reject(error)),
        );
      }
};
export default PaymentService;