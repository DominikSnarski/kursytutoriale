﻿using System;
using System.Linq;
using KursyTutoriale.Application.Contracts;
using Microsoft.AspNetCore.Http;

namespace KursyTutoriale.API
{
    public class ExecutionContextAccessor : IExecutionContextAccessor
    {
        private IHttpContextAccessor httpContext;

        public ExecutionContextAccessor(IHttpContextAccessor httpContext)
        {
            this.httpContext = httpContext;
        }

        public Guid GetUserId()
        {
            return Guid.Parse(
                httpContext
                .HttpContext
                .User
                .Claims
                .FirstOrDefault(claim => claim.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier").Value);
        }
    }
}