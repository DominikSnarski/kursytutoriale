using KursyTutoriale.Domain.Entities.Course;
using Moq;
using System;
using Xunit;

namespace KursyTutoriale.Tests.Courses.Courses
{
    public class AddLessonTests
    {
        [Fact]
        public void Return_false_if_module_with_given_id_doesnt_exsist()
        {
            //Arrange
            var module1 = new CourseModule(Guid.NewGuid());
            var course = new Course();

            //Act
            course.AddModule(module1);
            var result = course.AddLesson(new Lesson(Guid.NewGuid()), Guid.NewGuid());

            //Assert
            Assert.False(result);
        }

        [Theory]
        [InlineData(true)]
        [InlineData(false)]
        public void Return_module_add_lesson_result_if_module_exists(bool moduleResult)
        {
            //Arrange
            var moduleId = Guid.NewGuid();
            var moduleMock = new Mock<CourseModule>();
            moduleMock.Setup(m => m.AddLesson(It.IsAny<Lesson>())).Returns(moduleResult);
            moduleMock.Setup(m => m.Id).Returns(moduleId);
            var course = new Course();

            //Act
            course.AddModule(moduleMock.Object);
            var result = course.AddLesson(new Lesson(Guid.NewGuid()), moduleId);

            //Assert
            Assert.Equal(moduleResult, result);
        }
    }
}
