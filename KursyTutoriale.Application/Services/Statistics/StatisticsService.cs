using KursyTutoriale.Application.DataTransferObjects.Statistics;
using KursyTutoriale.Domain.Entities.Auth;
using KursyTutoriale.Domain.Entities.Course;
using KursyTutoriale.Domain.Entities.Statistics;
using KursyTutoriale.Infrastructure.Repositories;
using KursyTutoriale.Infrastructure.Repositories.Interfaces;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace KursyTutoriale.Application.Services.Statistics
{
    public class StatisticsService : IStatisticsService
    {
        private ICourseRepository courseRepository;
        private IExtendedRepository<UserAccountDate> userAccountDateRepository;
        private IExtendedRepository<UserSignInDate> userSignInRepository;
        public StatisticsService(ICourseRepository courseRepository,
            IExtendedRepository<UserAccountDate> userAccountDateRepository,
            IExtendedRepository<UserSignInDate> userSignInRepository)
        {
            this.courseRepository = courseRepository;
            this.userAccountDateRepository = userAccountDateRepository;
            this.userSignInRepository = userSignInRepository;
        }

        public List<DataDTO> GetCreatedCoursesData()
        {
            var query = courseRepository.Queryable().OrderBy(d => d.Date);
            List<DataDTO> list = new List<DataDTO>();
            if (query != null)
            {
                    for (DateTime firstDate = query.First().Date.Date; firstDate <= DateTime.Now.Date; firstDate = firstDate.AddDays(1))
                    {
                        list.Add(new DataDTO() { Amount = 0, Date = firstDate });
                    }
            }

            foreach(CourseReadModel model in query)
            {
                    list.Find(d => d.Date.Date.Equals(model.Date.Date)).Amount++;
            }

            return list;
            
        }

        public List<DataDTO> GetCreatedAccountsData()
        {
            var query = userAccountDateRepository.Queryable().OrderBy(d => d.Date); ;
            List<DataDTO> list = new List<DataDTO>();

            if (query != null)
            {
                for (DateTime firstDate = query.First().Date.Date; firstDate <= DateTime.Now.Date; firstDate = firstDate.AddDays(1))
                {
                    list.Add(new DataDTO() { Amount = 0, Date = firstDate });
                }
            }

            foreach (UserAccountDate model in query)
            {
                list.Find(d => d.Date.Date.Equals(model.Date.Date)).Amount++;
            }

            return list;

        }


        public List<DataDTO> GetSignInData()
        {
            var query = userSignInRepository.Queryable().OrderBy(d => d.Date); ;
            List<DataDTO> list = new List<DataDTO>();

            if (query != null)
            {
                for (DateTime firstDate = query.First().Date.Date; firstDate <= DateTime.Now.Date; firstDate = firstDate.AddDays(1))
                {
                    list.Add(new DataDTO() { Amount = 0, Date = firstDate });
                }
            }

            foreach (UserSignInDate model in query)
            {
                list.Find(d => d.Date.Date.Equals(model.Date.Date)).Amount++;
            }

            return list;

        }

        public List<UniversalDataDTO> GetDailySignInData()
        {
            var query = userSignInRepository.Queryable().OrderBy(d => d.Date); ;
            List<UniversalDataDTO> list = new List<UniversalDataDTO>();

            if (query != null)
            {
                for (int firstDate = 0; firstDate <= 24; firstDate++)
                {
                    list.Add(new UniversalDataDTO() { Date = firstDate, Amount = 0 });
                }
            }

            foreach (UserSignInDate model in query)
            {
                list.Find(d => d.Date.Equals(model.Date.Hour)).Amount++;
            }

            return list;

        }

    }
}
