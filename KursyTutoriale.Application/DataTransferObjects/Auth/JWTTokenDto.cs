﻿using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Application.DataTransferObjects.Auth
{
    public class JWTTokenDto
    {
        public string RefreshToken { get; set; }
        public string AccessToken { get; set; }
    }
}
