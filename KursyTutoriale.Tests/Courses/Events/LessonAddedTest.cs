using KursyTutoriale.Domain.Entities.Course;
using System;
using System.Linq;
using Xunit;

namespace KursyTutoriale.Tests.Courses.Events
{
    public class LessonAddedTest
    {
        [Fact]
        public void Return_true_when_no_lesson_in_course()
        {
            //Arrange
            var lessonId = Guid.NewGuid();

            var lesson = new Lesson(lessonId);
            var course = new Course();

            //Act
            var result = course.AddLesson(lesson);

            //Assert
            Assert.True(result);
        }

        [Fact]
        public void Add_lesson_to_collection_when_no_lesson_in_course()
        {
            //Arrange
            var lessonId = Guid.NewGuid();

            var lesson = new Lesson(lessonId);
            var course = new Course();

            //Act
            course.AddLesson(lesson);

            //Assert
            Assert.NotEmpty(course.Lessons);
            Assert.Equal(lesson.Id, course.Lessons.FirstOrDefault().Id);
        }
    }
}
