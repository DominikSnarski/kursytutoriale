using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using KursyTutoriale.Application.DataTransferObjects.Statistics;
using KursyTutoriale.Application.Services.Statistics;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace KursyTutoriale.API.Controllers
{
    
    [Route("api/[controller]")]
    public class StatisticsController : Controller
    {
        private IStatisticsService statisticsService;

        public StatisticsController(IStatisticsService statisticsService)
        {
            this.statisticsService = statisticsService;
        }

        [Authorize(Policy = "Admin")]
        [HttpGet("GetCreatedCoursesData")]
        public List<DataDTO> GetCreatedCoursesData()
        {
            var result = statisticsService.GetCreatedCoursesData();

            return result;
        }

        [Authorize(Policy = "Admin")]
        [HttpGet("GetCreatedAccountsData")]
        public List<DataDTO> GetCreatedAccountsData()
        {
            var result = statisticsService.GetCreatedAccountsData();

            return result;
        }

        [Authorize(Policy = "Admin")]
        [HttpGet("GetSignInData")]
        public List<DataDTO> GetSignInData()
        {
            var result = statisticsService.GetSignInData();

            return result;
        }

        [Authorize(Policy = "Admin")]
        [HttpGet("GetDailySignInData")]
        public List<UniversalDataDTO> GetDailySignInData()
        {
            var result = statisticsService.GetDailySignInData();

            return result;
        }

        [Authorize]
        [HttpGet("GetParticipantsData")]
        public List<DataDTO> GetParticipantsData()
        {
            var result = statisticsService.GetParticipantsData();

            return result;
        }

        [Authorize]
        [HttpGet("GetProgressData")]
        public List<UniversalDataDTO> GetProgressData()
        {
            var result = statisticsService.GetProgressData();

            return result;
        }

    }
}