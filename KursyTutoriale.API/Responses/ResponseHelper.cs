using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.API.Responses
{
    public static class ResponseHelper
    {
        public static string GetErrorMessage(IEnumerable<string> errors)
        {
            var sb = new StringBuilder();

            foreach (var error in errors)
                sb.Append(error + "\n");

            return sb.ToString();
        }
    }
}
