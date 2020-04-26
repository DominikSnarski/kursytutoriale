using KursyTutoriale.Domain.Entities.Payments;
using KursyTutoriale.Domain.Entities.Payments.PaymentMethods;
using KursyTutoriale.Shared;
using Microsoft.EntityFrameworkCore;

namespace KursyTutoriale.Infrastructure.Configuration.DataModels
{
    class PaymentMethodConfiguration
    {
        public static ModelBuilder Configure(ModelBuilder modelBuilder)
        {
            var paymentMethodBuilder = modelBuilder.Entity<PaymentMethod>();
            paymentMethodBuilder.ToTable("KTPaymentMethod");
            paymentMethodBuilder.HasKey(up => up.Id);
            paymentMethodBuilder
                .HasDiscriminator(up => up.Type)
                .HasValue<CreditCardPayment>(PaymentType.CreditCard);

            var creditCardBuilder = modelBuilder.Entity<CreditCard>();
            creditCardBuilder.ToTable("KTCreditCard");
            creditCardBuilder.HasKey(cc => cc.Id);

            var creditCardPaymentBuilder = modelBuilder.Entity<CreditCardPayment>();
            creditCardPaymentBuilder.HasOne(ccp => ccp.CreditCard);

            var paymentCustomerBuilder = modelBuilder.Entity<PaymentCustomer>();
            paymentCustomerBuilder.ToTable("KTPaymentCustomer");
            paymentCustomerBuilder.HasKey(up => up.UserId);
            paymentCustomerBuilder.HasMany(p => p.CreditCards);

            var transationBuilder = modelBuilder.Entity<Transaction>();
            transationBuilder.ToTable("KTTransation");
            transationBuilder.HasKey(t => t.Id);
            transationBuilder.HasOne(t => t.PaymentMethod);
            transationBuilder.OwnsMany(t => t.OrderItems, opt =>
            {
                opt.ToTable("KTOrderItem");
            });

            return modelBuilder;
        }
    }
}
