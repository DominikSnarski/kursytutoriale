using KursyTutoriale.Application.DataTransferObjects.Email;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using MailKit.Net.Smtp;
using MailKit;
using MimeKit;
using System.Text;
using System.Threading.Tasks;

namespace KursyTutoriale.Application.Services.Email
{
    public class EmailSender : IEmailSender
    {
        public EmailSender(IOptions<AuthMessageSenderOptions> optionsAccessor)
        {
            Options = optionsAccessor.Value;
        }

        public AuthMessageSenderOptions Options { get; } //set only via Secret Manager

        public void SendEmail(string email, string subject, string message)
        {
             Execute(Options.EmailLogin,Options.EmailPassword, subject, message, email);
        }

        public void Execute(string login,string password, string subject, string _message, string email)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("KursyTutoriale", login));
            message.To.Add(new MailboxAddress(subject, email));
            message.Subject = "Email Confirmation.";

            message.Body = new TextPart("plain")
            {
                Text = _message
            };

            using (var client = new SmtpClient())
            {
                client.Connect("smtp.gmail.com", 587);

                client.AuthenticationMechanisms.Remove("XOAUTH2");

                // Note: only needed if the SMTP server requires authentication
                client.Authenticate(login, password);

                client.Send(message);
                client.Disconnect(true);
            }

        }
    }
}
