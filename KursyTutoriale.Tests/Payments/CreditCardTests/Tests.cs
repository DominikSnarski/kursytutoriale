using KursyTutoriale.Domain.Entities.Payments;
using Xunit;

namespace KursyTutoriale.Tests.Payments.CreditCardTests
{
    public class Tests
    {
        [Fact]
        public void Set_last4Digits_to_last_four_characters_of_CCNumber()
        {
            var cardNumber = "1234563298461839741209";

            var creditCard = new CreditCard(cardNumber, 0, 0, "", "");

            Assert.Equal("1209", creditCard.Last4Digits);
        }
    }
}
