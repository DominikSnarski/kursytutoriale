﻿using KursyTutoriale.Application.Services.Admin;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KursyTutoriale.API.Controllers
{
    [Route("api/[controller]")]
    public class AdminController : Controller
    {
        private IAdminService adminService;

        public AdminController(IAdminService adminService)
        {
            this.adminService = adminService;
        }

        [HttpPost("PromoteToModerator")]
        public async Task<IActionResult> PromoteToModerator(Guid userId)
        {
            var success = await adminService.CreateModeratorProfile(userId);

            if (!success)
                return StatusCode(400);

            return Ok();
        }
    }
}
