using KursyTutoriale.Application.DataTransferObjects.Statistics;
using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Application.Services.Statistics
{
    public interface IStatisticsService
    {
        List<DataDTO> GetCreatedCoursesData();
        List<DataDTO> GetCreatedAccountsData();
        List<DataDTO> GetSignInData();
        List<UniversalDataDTO> GetDailySignInData();
    }
}
