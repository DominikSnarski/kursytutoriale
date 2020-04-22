namespace KursyTutoriale.Domain.Entities.Payments.PaymentMethods
{
    public class PaymentMethodData
    {
        public PaymentMethodData(string type, object data)
        {
            Type = type;
            Data = data;
        }

        public string Type { get; set; }
        public object Data { get; set; }
    }
}
