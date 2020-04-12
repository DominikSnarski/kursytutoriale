using KursyTutoriale.Shared.Exceptions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.ComponentModel.DataAnnotations;
using System.Net;
using System.Security.Authentication;
using System.Threading.Tasks;

namespace KursyTutoriale.API.Middleware
{
    public class ExceptionHandling
    {
        private readonly RequestDelegate next;
        public ExceptionHandling(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext context, ILoggerFactory loggerFactory)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex, loggerFactory);
            }
        }

        private static Task HandleExceptionAsync(HttpContext context, Exception ex, ILoggerFactory loggerFactory)
        {
            var logger = loggerFactory.CreateLogger("Exception");

            var code = ex switch
            {
               UnauthorizedAccessException _ => HttpStatusCode.Unauthorized,
               AuthenticationException _ => HttpStatusCode.BadRequest,
               InvalidStateException _ => HttpStatusCode.BadRequest,
               NotImplementedException _ => HttpStatusCode.NotImplemented,
               ValidationException _ => HttpStatusCode.BadRequest,
               JsonSerializationException _ => HttpStatusCode.BadRequest,
                _ => HttpStatusCode.InternalServerError
            };

            string message = "";
            if(code == HttpStatusCode.NotImplemented)
            {
                message = "Api endpoint not implemented";
            }
            else if(code == HttpStatusCode.InternalServerError)
            {
                logger.LogError(ex.ToString());
                message = "Unexpected server error";
            }
            else
            {
                if(ex is JsonSerializationException)
                {
                    message = "Other validation error";
                    logger.LogError(ex.ToString());
                }
                else
                {
                    message = ex.Message;

                    if (!(ex.InnerException is null))
                        logger.LogError(ex.InnerException.ToString());
                }
            }
                
            var result = JsonConvert.SerializeObject(new { error = message });
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)code;
            return context.Response.WriteAsync(result);
        }
    }
}
