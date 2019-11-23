using System;
using System.Collections.Generic;
using System.Text;
using Autofac;
using AutoMapper;
using KursyTutoriale.Application.DataTransferObjects;
using KursyTutoriale.Domain.Entities;

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
                cfg.CreateMap<Course, CourseCreationDTO>();
                cfg.CreateMap<Course, CourseDetailsDTO>();
                cfg.CreateMap<Course, CourseForEditionDTO>();
                cfg.CreateMap<UserProfile, UserBasicInformationDTO>();
            });

            DTOMapper dtoMapper = new DTOMapper(config);

            builder.RegisterInstance(dtoMapper).As<IDTOMapper>();
        }
    }
}
