using KursyTutoriale.Application.Contracts;
using KursyTutoriale.Application.DataTransferObjects.Statistics;
using KursyTutoriale.Application.Services.CoursePublication;
using KursyTutoriale.Domain.Entities.Course;
using KursyTutoriale.Domain.Entities.CoursePublication;
using KursyTutoriale.Domain.Entities.Statistics;
using KursyTutoriale.Domain.Repositories;
using KursyTutoriale.Infrastructure.Repositories.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace KursyTutoriale.Application.Services.Statistics
{
    public class StatisticsService : IStatisticsService
    {
        private ICourseRepository courseRepository;
        private IExtendedRepository<UserAccountDate> userAccountDateRepository;
        private IExtendedRepository<UserSignInDate> userSignInRepository;
        private IExtendedRepository<CoursePublicationProfile> profilesRepository;
        private IExecutionContextAccessor executionContextAccessor;
        private ICourseProgressService courseProgressService;
        public StatisticsService(ICourseRepository courseRepository,
            IExtendedRepository<UserAccountDate> userAccountDateRepository,
            IExtendedRepository<UserSignInDate> userSignInRepository,
            IExtendedRepository<CoursePublicationProfile> profilesRepository,
            IExecutionContextAccessor executionContextAccessor,
            ICourseProgressService courseProgressService)
        {
            this.courseRepository = courseRepository;
            this.userAccountDateRepository = userAccountDateRepository;
            this.userSignInRepository = userSignInRepository;
            this.profilesRepository = profilesRepository;
            this.executionContextAccessor = executionContextAccessor;
            this.courseProgressService = courseProgressService;
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


        public List<DataDTO> GetParticipantsData()
        {
            List<DataDTO> list = new List<DataDTO>();
            var userId = executionContextAccessor.GetUserId();

            var profiles= profilesRepository.Queryable().Where(p => p.OwnerId.Equals(userId));
            if (profiles == null)
                return list;

            foreach (CoursePublicationProfile profile in profiles)
            {
                var query = profile.Participants.OrderBy(d => d.Date);


                if (query != null)
                {
                    if (query.Count() == 0) continue;
                    if (DateTime.Now.Date.Year - query.First().Date.Date.Year > 20)  continue;

                    for (DateTime firstDate = query.First().Date.Date; firstDate <= DateTime.Now.Date; firstDate = firstDate.AddDays(1))
                    {
                        list.Add(new DataDTO() { Amount = 0, Date = firstDate });
                    }
                }

                foreach (Participant participant in query)
                {
                    list.Find(d => d.Date.Date.Equals(participant.Date.Date)).Amount++;
                }

            }
            return list;

        }

        public List<UniversalDataDTO> GetProgressData()
        {
            List<UniversalDataDTO> list = new List<UniversalDataDTO>();
            var userId = executionContextAccessor.GetUserId();

            var profiles = profilesRepository.Queryable().Where(p => p.OwnerId.Equals(userId));
            if (profiles == null)
                return list;

            var courseQuery = courseRepository.Queryable().Where(q => q.OwnerId.Equals(userId)).ToList();

            for (int firstDate = 0; firstDate <= 100; firstDate++)
            {
                list.Add(new UniversalDataDTO() { Date = firstDate, Amount = 0 });
            }

            foreach (CoursePublicationProfile profile in profiles)
            {
                var course = courseQuery.FirstOrDefault(c => c.Id.Equals(profile.CourseId));

                foreach(Participant participant in profile.Participants)
                {
                    var prog = courseProgressService.GetUserProgress(participant.UserId, course, profile);
                    list.Find(d => d.Date.Equals(prog)).Amount++;
                }

            }
            return list;

        }


    }
}
