using KursyTutoriale.Application;
using KursyTutoriale.Application.Contracts;
using KursyTutoriale.Application.DataTransferObjects.Course;
using KursyTutoriale.Application.Services;
using KursyTutoriale.Domain.Entities.Course;
using KursyTutoriale.Domain.Entities.CoursePublication;
using KursyTutoriale.Infrastructure.Repositories;
using KursyTutoriale.Infrastructure.Repositories.Interfaces;
using KursyTutoriale.Shared;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Xunit;

namespace KursyTutoriale.Tests.Courses.CourseServiceTests
{
    public class GetCourseDetails
    {
        [Fact]
        public void Throw_if_course_doesnt_exists()
        {
            var courseQuery = new List<CourseReadModel>().AsQueryable();

            var repositoryMock = new Mock<ICourseRepository>();
            repositoryMock.Setup(m => m.Queryable()).Returns(courseQuery);

            var service = new CourseService(null, null, null, repositoryMock.Object, null,null);

            Assert.Throws<NullReferenceException>(()=>service.GetCourseDetails(Guid.Empty));
        }

        [Fact]
        public void Verified_is_true_if_stamp_status_is_verified()
        {
            //Arrange
            var courseId = Guid.NewGuid();
            var courseQuery = new List<CourseReadModel>
            {
                new CourseReadModel
                {
                    Id = courseId,
                    VerificationStamp = new VerificationStamp
                    {
                        Status = StampStatus.Verified
                    }
                }
            }.AsQueryable();

            var repositoryMock = new Mock<ICourseRepository>();
            repositoryMock.Setup(m => m.Queryable()).Returns(courseQuery);

            var mapperMock = new Mock<IDTOMapper>();
            mapperMock.Setup(m => m.Map<CourseDetailsDTO>(It.IsAny<CourseReadModel>()))
                .Returns(new CourseDetailsDTO());

            var service = new CourseService(
                null,
                mapperMock.Object,
                null,
                repositoryMock.Object,
                new Mock<IExtendedRepository<CoursePublicationProfile>>().Object,
                null);

            //Act
            var details = service.GetCourseDetails(courseId);

            //Assert
            Assert.True(details.Verified);
        }


        [Theory]
        [InlineData(StampStatus.Blocked)]
        [InlineData(StampStatus.Pending)]
        [InlineData(StampStatus.Rejected)]
        public void Verified_is_false_if_stamp_status_is_other_than_verified(StampStatus stampStatus)
        {
            //Arrange
            var courseId = Guid.NewGuid();
            var courseQuery = new List<CourseReadModel>
            {
                new CourseReadModel
                {
                    Id = courseId,
                    VerificationStamp = new VerificationStamp
                    {
                        Status = stampStatus
                    }
                }
            }.AsQueryable();

            var repositoryMock = new Mock<ICourseRepository>();
            repositoryMock.Setup(m => m.Queryable()).Returns(courseQuery);

            var mapperMock = new Mock<IDTOMapper>();
            mapperMock.Setup(m => m.Map<CourseDetailsDTO>(It.IsAny<CourseReadModel>()))
                .Returns(new CourseDetailsDTO());

            var service = new CourseService(
                null,
                mapperMock.Object,
                null,
                repositoryMock.Object,
                new Mock<IExtendedRepository<CoursePublicationProfile>>().Object,
                null);

            //Act
            var details = service.GetCourseDetails(courseId);

            //Assert
            Assert.False(details.Verified);
        }


        [Fact]
        public void Public_is_false_if_publication_profile_of_course_doesnt_exists()
        {
            //Arrange
            var courseId = Guid.NewGuid();
            var courseQuery = new List<CourseReadModel>
            {
                new CourseReadModel{ Id = courseId, VerificationStamp = new VerificationStamp() }
            }.AsQueryable();

            var repositoryMock = new Mock<ICourseRepository>();
            repositoryMock.Setup(m => m.Queryable()).Returns(courseQuery);

            var mapperMock = new Mock<IDTOMapper>();
            mapperMock.Setup(m => m.Map<CourseDetailsDTO>(It.IsAny<CourseReadModel>()))
                .Returns(new CourseDetailsDTO());

            var profileQuery = new List<CoursePublicationProfile>().AsQueryable();
            var profileMock = new Mock<IExtendedRepository<CoursePublicationProfile>>();
                profileMock.Setup(m => m.Queryable()).Returns(profileQuery);

            var service = new CourseService(
                null,
                mapperMock.Object,
                null,
                repositoryMock.Object,
                profileMock.Object,
                null);

            //Act
            var details = service.GetCourseDetails(courseId);

            //Assert
            Assert.False(details.Public);
        }


     /*   [Fact]
        public void Public_is_true_if_publication_profile_of_course_exists()
        {
            //Arrange
            var courseId = Guid.NewGuid();
            var courseQuery = new List<CourseReadModel>
            {
                new CourseReadModel{ Id = courseId, VerificationStamp = new VerificationStamp() }
            }.AsQueryable();

            var repositoryMock = new Mock<ICourseRepository>();
            repositoryMock.Setup(m => m.Queryable()).Returns(courseQuery);

            var mapperMock = new Mock<IDTOMapper>();
            mapperMock.Setup(m => m.Map<CourseDetailsDTO>(It.IsAny<CourseReadModel>()))
                .Returns(new CourseDetailsDTO());

            var profileQuery = new List<CoursePublicationProfile>
            {
                new CoursePublicationProfile(courseId, Guid.NewGuid())
            }.AsQueryable();

            var profileMock = new Mock<IExtendedRepository<CoursePublicationProfile>>();
            profileMock.Setup(m => m.Queryable()).Returns(profileQuery);

            var userContext = new Mock<IExecutionContextAccessor>();
            userContext.Setup(m => m.GetUserId()).Returns(Guid.NewGuid());

            var service = new CourseService(
                null,
                mapperMock.Object,
                userContext.Object,
                repositoryMock.Object,
                profileMock.Object,
                null);

            //Act
            var details = service.GetCourseDetails(courseId);

            //Assert
            Assert.True(details.Public);
        }*/
    }
}
