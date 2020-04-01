using KursyTutoriale.Domain.Entities.Course;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Xunit;

namespace KursyTutoriale.Tests.Courses.Courses
{
    public class AddModuleTests
    {
        [Fact]
        public void Return_true_when_no_module_in_course()
        {
            //Arrange
            var moduleId = Guid.NewGuid();

            var module = new CourseModule(moduleId);
            var course = new Course();

            //Act
            var result = course.AddModule(module);

            //Assert
            Assert.True(result);
        }

        [Fact]
        public void Return_false_if_module_with_given_id_already_exists_in_collection()
        {
            //Arrange
            var moduleId = Guid.NewGuid();

            var module = new CourseModule(moduleId);
            var course = new Course();

            //Act
            course.AddModule(module);
            var result = course.AddModule(module);

            //Assert
            Assert.False(result);
        }

        [Fact]
        public void Dont_add_module_if_module_with_given_id_already_exists_in_collection()
        {
            //Arrange
            var moduleId = Guid.NewGuid();

            var module = new CourseModule(moduleId);
            var course = new Course();

            //Act
            course.AddModule(module);
            course.AddModule(module);

            //Assert
            Assert.Equal(1, course.Modules.Count);
        }

        [Fact]
        public void Add_module_to_empty_module_list()
        {
            //Arrange
            var moduleId = Guid.NewGuid();

            var module = new CourseModule(moduleId);
            var course = new Course();

            //Act
            bool result = course.AddModule(module);

            //Assert
            Assert.NotEmpty(course.Modules);
            Assert.Equal(module.Id, course.Modules.FirstOrDefault().Id);
        }

        [Fact]
        public void Add_lesson_to_empty_module()
        {
            //Arrange
            var moduleId = Guid.NewGuid();
            var lessonId = Guid.NewGuid();

            var module = new CourseModule(moduleId);
            var lesson = new Lesson(lessonId);
            var course = new Course();

            //Act
            course.AddModule(module);
            course.AddLesson(lesson, moduleId);

            //Assert
            Assert.NotEmpty(module.Lessons);
            Assert.Equal(lessonId, module.Lessons.FirstOrDefault().Id);
        }

        [Fact]
        public void Set_index_of_first_added_module_to_0()
        {
            //Arrange
            var moduleId = Guid.NewGuid();

            var module = new CourseModule(moduleId);
            var course = new Course();

            //Act
            course.AddModule(module);

            //Assert
            var expectedIndex = 0;
            Assert.Equal(expectedIndex, module.Index);
        }


        [Fact]
        public void Set_index_of_second_added_module_to_1()
        {
            //Arrange
            var module1 = new CourseModule(Guid.NewGuid());
            var module2 = new CourseModule(Guid.NewGuid());
            var course = new Course();

            //Act
            course.AddModule(module1);
            course.AddModule(module2);

            //Assert
            var expectedIndex = 1;
            Assert.Equal(expectedIndex, module2.Index);
        }
    }
}
