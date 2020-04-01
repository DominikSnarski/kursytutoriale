using KursyTutoriale.Domain.Entities.Course;
using KursyTutoriale.Shared;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace KursyTutoriale.Tests.Courses.Courses
{
    public class IsVerifiedTests
    {
        [Fact]
        public void Return_true_if_stamp_status_is_verified()
        {
            //Arrange
            var stamp = new VerificationStamp { Status = StampStatus.Verified };
            var course = new Course();

            course.VerificationStamp = stamp;

            //Act
            bool result = course.IsVerified();

            //Assert
            Assert.True(result);
        }

        [Theory]
        [InlineData(StampStatus.Blocked)]
        [InlineData(StampStatus.Pending)]
        [InlineData(StampStatus.Rejected)]
        public void Return_false_if_stamp_status_is_other_than_verified(StampStatus stampStatus)
        {
            //Arrange
            var stamp = new VerificationStamp { Status = stampStatus };
            var course = new Course();

            course.VerificationStamp = stamp;

            //Act
            bool result = course.IsVerified();

            //Assert
            Assert.False(result);
        }
    }
}
