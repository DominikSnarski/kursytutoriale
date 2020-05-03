using KursyTutoriale.Application;
using KursyTutoriale.Application.DataTransferObjects.NewCourse;
using KursyTutoriale.Application.Services;
using KursyTutoriale.Domain.Entities.Course;
using KursyTutoriale.Domain.Entities.CoursePublication;
using KursyTutoriale.Domain.Repositories;
using KursyTutoriale.Infrastructure.Repositories.Interfaces;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;

namespace KursyTutoriale.Tests.Courses.CourseServiceTests
{
    public class GetFeaturedCourses
    {
        [Fact]
        public void Return_top_rated_courses()
        {
            var bestCourseId = Guid.NewGuid();

            var courseProfilesList = new List<CoursePublicationProfile>
            {
                new CoursePublicationProfile(bestCourseId,Guid.Empty, 0){
                    Rating = 10
                },
                new CoursePublicationProfile(Guid.NewGuid(),Guid.Empty, 0){
                    Rating = 6
                },
                new CoursePublicationProfile(Guid.NewGuid(),Guid.Empty, 0){
                    Rating = 3
                },
                new CoursePublicationProfile(Guid.NewGuid(),Guid.Empty, 0){
                    Rating = 9
                },
            }; 
            
            var publicationMock = new Mock<IExtendedRepository<CoursePublicationProfile>>();
            publicationMock.Setup(m => m.Queryable()).Returns(courseProfilesList.AsQueryable());

            var courseList = new List<CourseReadModel>
            {
                new CourseReadModel{
                    Id = bestCourseId
                }
            };

            var courseRepoMock = new Mock<ICourseRepository>();
            courseRepoMock.Setup(c => c.Queryable()).Returns(courseList.AsQueryable());

            var mapperMock = new Mock<IDTOMapper>();

            var service = new CourseService(
                null,
                mapperMock.Object,
                null,
                courseRepoMock.Object,
                publicationMock.Object,
                null,
                null,
                null);

            var result = service.GetFeaturedCourses(1);

            mapperMock.Verify(mm => mm.Map<List<CoursePageItemDTO>>(courseList), Times.Exactly(2));
        }


        [Fact]
        public void Dont_return_when_course_doesnt_has_highest_rating()
        {
            var bestCourseId = Guid.NewGuid();

            var courseProfilesList = new List<CoursePublicationProfile>
            {
                new CoursePublicationProfile(bestCourseId,Guid.Empty, 0){
                    Rating = 0,
                    Popularity =0
                },
                new CoursePublicationProfile(Guid.NewGuid(),Guid.Empty, 0){
                    Rating = 6,
                    Popularity =10
                },
                new CoursePublicationProfile(Guid.NewGuid(),Guid.Empty, 0){
                    Rating = 3,
                    Popularity =110
                },
                new CoursePublicationProfile(Guid.NewGuid(),Guid.Empty, 0){
                    Rating = 9,
                    Popularity =1110
                },
            };

            var publicationMock = new Mock<IExtendedRepository<CoursePublicationProfile>>();
            publicationMock.Setup(m => m.Queryable()).Returns(courseProfilesList.AsQueryable());

            var courseList = new List<CourseReadModel>
            {
                new CourseReadModel{
                    Id = bestCourseId
                }
            };

            var courseRepoMock = new Mock<ICourseRepository>();
            courseRepoMock.Setup(c => c.Queryable()).Returns(courseList.AsQueryable());

            var mapperMock = new Mock<IDTOMapper>();

            var service = new CourseService(
                null,
                mapperMock.Object,
                null,
                courseRepoMock.Object,
                publicationMock.Object,
                null,
                null,
                null);

            var result = service.GetFeaturedCourses(1);

            mapperMock.Verify(mm => mm.Map<List<CoursePageItemDTO>>(courseList), Times.Never);
        }
    }
}
