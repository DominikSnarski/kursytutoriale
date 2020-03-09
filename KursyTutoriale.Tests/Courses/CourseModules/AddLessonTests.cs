using KursyTutoriale.Domain.Entities.Course;
using System;
using Xunit;

namespace KursyTutoriale.Tests.Courses.CourseModules
{
    public class AddLessonTests
    {
        [Fact]
        public void Return_true_when_no_lessons_in_module()
        {
            //Arrange
            var lessonId = Guid.NewGuid();

            var lesson = new Lesson(lessonId);
            var module = new CourseModule();

            //Act
            var result = module.AddLesson(lesson);

            //Assert
            Assert.True(result);
        }

        [Fact]
        public void Return_false_if_lesson_with_given_id_already_exists_in_collection()
        {
            //Arrange
            var lessonId = Guid.NewGuid();

            var lesson = new Lesson(lessonId);
            var module = new CourseModule();

            //Act
            module.AddLesson(lesson);
            var result = module.AddLesson(lesson);

            //Assert
            Assert.False(result);
        }

        [Fact]
        public void Dont_add_lesson_if_lesson_with_given_id_already_exists_in_collection()
        {
            //Arrange
            var lessonId = Guid.NewGuid();

            var lesson = new Lesson(lessonId);
            var module = new CourseModule();

            //Act
            module.AddLesson(lesson);
            module.AddLesson(lesson);

            //Assert
            Assert.Equal(1, module.Lessons.Count);
        }

    }
}
