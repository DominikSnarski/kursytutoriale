using AutoMapper;
using KursyTutoriale.Application;
using KursyTutoriale.Application.DataTransferObjects;
using KursyTutoriale.Domain;
using KursyTutoriale.Domain.Entities;
using KursyTutoriale.Infrastructure;
using KursyTutoriale.Infrastructure.Repositories;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Text;
using Xunit;

namespace KursyTutoriale.Tests
{
    public class AutoMapperTests
    {
        //[Fact]
        //public void MapCourseForEditionDTO()
        //{
        //    IDTOMapper mapper = new DTOMapper(new MapperConfiguration(cfg =>
        //    {
        //        cfg.CreateMap<Course, CourseForEditionDTO>();
        //    }));
        //    string title = "Nauka JS";
        //    Guid authorId = new Guid();
        //    DateTime date = new DateTime();
        //    string content = "hello";
        //    Course course = new Course()
        //    {
        //        Title = title,
        //        Content = content,
        //        AuthorId = authorId,
        //        Date = date
        //    };
        //    CourseForEditionDTO dto = mapper.Map<CourseForEditionDTO>(course);
        //    Assert.True(dto.Id.Equals(course.Id));
        //    Assert.True(dto.Title.Equals(course.Title));
        //    Assert.True(dto.Content.Equals(course.Content));
        //}
    }
}
