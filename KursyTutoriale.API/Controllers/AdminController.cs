﻿using KursyTutoriale.Application.Services.Admin;
using KursyTutoriale.Domain.Entities.Administration;
using KursyTutoriale.Domain.Entities.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace KursyTutoriale.API.Controllers
{
    [Authorize(Policy = "Admin")]
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

        [HttpDelete("RemoveModerator")]
        public async Task<IActionResult> RemoveModerator(Guid moderatorId)
        {
            var success = await adminService.RemoveModerator(moderatorId);

            if (!success)
                return StatusCode(400);

            return Ok();
        }

        [HttpGet("GetListOfUsers")]
        public async Task<IList<UserBasic>> GetListOfUsers()
        {
            var list = await adminService.GetListOfUsers();
            return list;
        }

        [HttpGet("GetListOfModerators")]
        public async Task<IList<UserBasic>> GetListOfModerators()
        {
            var list = await adminService.GetListOfModerators();
            return list;
        }

        [HttpPost("AwardKarmaPoints")]
        public void AwardKarmaPoints(Guid userId, int amount)
        {
            adminService.AwardKarmaPoints(userId, amount);
        }
    }
}
