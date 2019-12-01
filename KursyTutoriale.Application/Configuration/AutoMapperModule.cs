﻿using Autofac;
using AutoMapper;
using KursyTutoriale.Application.DataTransferObjects.Course;
using KursyTutoriale.Application.DataTransferObjects.Tags;
using KursyTutoriale.Domain.Entities;
using KursyTutoriale.Domain.Entities.Course;

namespace KursyTutoriale.Application.Configuration
{
    public class AutoMapperModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            //Add new Maps for Data Transfer Object here
            var config = new MapperConfiguration(cfg =>
            {

                cfg.CreateMap<Course, CourseBasicInformationsDTO>();
                cfg.CreateMap<CourseModule, CourseModuleBasicInformationsDTO>();
                cfg.CreateMap<Lesson, LessonBasicInformationsDTO>();


                cfg.CreateMap<Course, CourseDetailsDTO>();
                cfg.CreateMap<CourseModule, CourseModuleDetailsDTO>();
                cfg.CreateMap<Lesson, LessonDetailsDTO>();

                cfg.CreateMap<Course, CourseForEditionDTO>();
                cfg.CreateMap<CourseModule, CourseModuleForEditionDTO>();
                cfg.CreateMap<Lesson, LessonForEditionDTO>();

                cfg.CreateMap<Tag, TagDTO>();


            });

            DTOMapper dtoMapper = new DTOMapper(config);

            builder.RegisterInstance(dtoMapper).As<IDTOMapper>();
        }
    }
}
