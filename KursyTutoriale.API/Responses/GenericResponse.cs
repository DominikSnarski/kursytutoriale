namespace KursyTutoriale.API.Responses
{
    public class GenericResponse<TReturn>
    {
        public GenericResponse(TReturn data) 
        {
            Data = data;
        }

        public TReturn Data { get; set; }
    }
}
