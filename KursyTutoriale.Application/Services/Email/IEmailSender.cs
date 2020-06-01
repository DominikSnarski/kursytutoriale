using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace KursyTutoriale.Application.Services.Email
{
    public interface IEmailSender
    {
        void SendEmail(string email, string subject, string message);
        void Execute(string login, string password, string subject, string _message, string email);
    }
}
