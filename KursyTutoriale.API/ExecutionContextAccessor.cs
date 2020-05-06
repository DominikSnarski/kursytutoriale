using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
        public bool IsAuthorized { get {
                return httpContext
                                ?.HttpContext
                                ?.User
                                ?.Claims
                                ?.FirstOrDefault(claim => claim.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier") != null;
            } 
        }

        public Guid GetUserId()
        {
            var userId = httpContext
                            ?.HttpContext
                            ?.User
                            ?.Claims
                            ?.FirstOrDefault(claim => claim.Type == "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier");

            if (userId is null)
                throw new UnauthorizedAccessException("Unauthorized access");

            return Guid.Parse(userId.Value);
        }

        public bool TryGetUserId(out Guid userId)
        {
            try
            {
                userId = GetUserId();
                return true;
            }
            catch (UnauthorizedAccessException)
            {
                userId = Guid.Empty;
                return false;
            }
        }

        public IEnumerable<string> GetUserRoles()
        {
            var userRoles = httpContext
                            ?.HttpContext
                            ?.User
                            ?.Claims
                            ?.Where(claim => claim.Type == "http://schemas.microsoft.com/ws/2008/06/identity/claims/role");

            if (userRoles is null)
                throw new UnauthorizedAccessException("Unauthorized access");

            List<string> rolesString = new List<string>();
            foreach(Claim c in userRoles)
            {
                rolesString.Add(c.Value);
            }

            return rolesString.AsEnumerable();
        }
    }
}
