using KursyTutoriale.Application.Contracts;
using KursyTutoriale.Domain.Entities.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace KursyTutoriale.API.Middleware
{
    public class ChatHub : Hub
    {
        private IExecutionContextAccessor executionContext;
        UserManager<ApplicationUser> userManager;

        public ChatHub(IExecutionContextAccessor executionContext,
            UserManager<ApplicationUser> userManager)
        {
            this.executionContext = executionContext;
            this.userManager = userManager;
        }
        public async Task SendMessageToGroup(string courseId,string userName, string message)
        {

            var groupName = courseId.ToString();

            await Clients.Group(groupName).SendAsync("GetMessage", $"{userName}: {message}");
        }

        public async Task AddToRoom(string courseId, string username)
        {
            var groupName = courseId.ToString();
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

             await Clients.Group(groupName).SendAsync("GetMessage", $"{username} has joined the group.");
        }

        public async Task LeaveRoom(string courseId, string username)
        {
            var groupName = courseId.ToString();

            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);

            await Clients.Group(groupName).SendAsync("GetMessage", $"{username} has left the group.");
        }

    }
}
