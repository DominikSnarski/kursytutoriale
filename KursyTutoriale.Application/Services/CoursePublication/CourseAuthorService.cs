using KursyTutoriale.Application.DataTransferObjects.UserProfiles;
using KursyTutoriale.Domain.Entities.CoursePublication;
using KursyTutoriale.Domain.Entities.UserProfiles;
using KursyTutoriale.Domain.Repositories;
using System.Collections.Generic;
using System.Linq;

namespace KursyTutoriale.Application.Services.CoursePublication
{
    class CourseAuthorService : ICourseAuthorService
    {
        private IExtendedRepository<UserProfile> profileRepository;
        private IExtendedRepository<CoursePublicationProfile> publicationRepository;
        private IDTOMapper mapper;

        public CourseAuthorService(
            IExtendedRepository<UserProfile> profileRepository,
            IExtendedRepository<CoursePublicationProfile> publicationRepository,
            IDTOMapper mapper)
        {
            this.profileRepository = profileRepository;
            this.publicationRepository = publicationRepository;
            this.mapper = mapper;
        }

        public List<UserProfileDTO> GetMostPopularAuthors(int count)
        {
            var authorsIds = publicationRepository.Queryable().Select(pp => pp.OwnerId).Distinct().ToList();

            var topAuthorsIds = authorsIds.Select(id => new
                {
                    AuthorId = id,
                    Courses = publicationRepository.Queryable().Where(pp => pp.OwnerId == id).ToList()
                })
                .OrderByDescending(tmp => tmp.Courses.Aggregate(0, (sum, profile) => sum + profile.Popularity))
                .Take(count)
                .Select(tmp => tmp.AuthorId)
                .ToList();

            return mapper.Map<List<UserProfileDTO>>(
                    profileRepository
                    .Queryable()
                    .Where(up => topAuthorsIds
                    .Contains(up.Id))
                    .ToList());
        }
    }
}
