namespace KursyTutoriale.API.Models.Auth
{
    public class RefreshTokenRequest
    {
        public string Username { get; set; }
        public string RefreshToken { get; set; }
    }
}
