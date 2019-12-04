using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.API.Responses
{
    public class GenericResponse
    {
        public GenericResponse(){ }
        public GenericResponse(int code)
        {
            Code = code;
            Description = "";
        }

        public GenericResponse(int code, string description)
        {
            Code = code;
            Description = description;
        }

        public GenericResponse(int code, IEnumerable<string> messages)
        {
            Code = code;

            var sb = new StringBuilder();

            foreach (var message in messages)
                sb.Append(message + "\n");

            Description = sb.ToString();
        }

        public int Code { get; set; }
        public string Description { get; set; }
    }
}
