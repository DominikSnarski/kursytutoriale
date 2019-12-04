using System.Collections.Generic;

namespace KursyTutoriale.API.Responses
{
    public class DtoBasedRsponse<TDto>:GenericResponse
    {
        public DtoBasedRsponse():base()
        {

        }

        public DtoBasedRsponse(TDto data) : base(200)
        {
            Payload = data;
        }

        public DtoBasedRsponse(int code, string description) : base(code,description)
        {

        }

        public DtoBasedRsponse(int code, IEnumerable<string> messages) : base(code, messages)
        {

        }

        public TDto Payload { get; set; }

    }
}
