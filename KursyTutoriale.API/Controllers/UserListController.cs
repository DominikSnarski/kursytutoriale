using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KursyTutoriale.Application;
using KursyTutoriale.Application.DataTransferObjects;
using KursyTutoriale.Domain.Entities;
using KursyTutoriale.Infrastructure.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KursyTutoriale.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserListController : ControllerBase
    {
        IUserProfileDTOBuilder userProfileDTOBuilder;
        IUserProfileRepository userProfileRepository;
        public UserListController(IUserProfileDTOBuilder userProfileDTOBuilder,
                                  IUserProfileRepository userProfileRepository)
        {
            this.userProfileDTOBuilder = userProfileDTOBuilder;
            this.userProfileRepository = userProfileRepository;
        }


        [HttpGet("userList")]
        public IEnumerable<UserProfileDTO> GetUserProfileList()
        {
            IQueryable<UserProfile> repositoryList = userProfileRepository.Queryable();
            List<UserProfileDTO> list = new List<UserProfileDTO>();
            foreach (UserProfile userProfile in repositoryList)
                list.Add(userProfileDTOBuilder.BuildUserProfileDTO(userProfile));
            return list.AsEnumerable<UserProfileDTO>();
        }
    }
}