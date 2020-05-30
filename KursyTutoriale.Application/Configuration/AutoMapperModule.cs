using Autofac;
using AutoMapper;
using KursyTutoriale.Application.DataTransferObjects.Auth;
using KursyTutoriale.Application.DataTransferObjects.Course;
using KursyTutoriale.Application.DataTransferObjects.Course.Report;
using KursyTutoriale.Application.DataTransferObjects.NewCourse;
using KursyTutoriale.Application.DataTransferObjects.Tags;
using KursyTutoriale.Application.DataTransferObjects.UserProfiles;
using KursyTutoriale.Domain.Entities.Administration;
using KursyTutoriale.Domain.Entities.Auth;
using KursyTutoriale.Domain.Entities.Course;
using KursyTutoriale.Domain.Entities.CoursePublication;
using KursyTutoriale.Domain.Entities.UserProfiles;
using System;
using System.Collections.Generic;
using System.Linq;

namespace KursyTutoriale.Application.Configuration
{
    public class AutoMapperModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            //Add new Maps for Data Transfer Object here
            var config = new MapperConfiguration(cfg =>
            {
                IEnumerable<Type> dtoTypes = typeof(CourseDetailsDTO).Assembly.GetTypes()
                    .Where(t => !(t.Namespace is null) && t.Namespace.StartsWith("KursyTutoriale.Application.DataTransferObjects"));

                IEnumerable<Type> entityTypes = typeof(Course).Assembly.GetTypes()
                    .Where(t => !(t.Namespace is null) && t.Namespace.StartsWith("KursyTutoriale.Domain.Entities")).ToList();

                foreach (Type dto in dtoTypes)
                {
                    foreach(Type entity in entityTypes)
                    {
                        if (dto.Name.ToUpper().StartsWith(entity.Name.ToUpper()) && 
                            dto.Name.ToUpper().EndsWith("DTO"))
                        {
                            cfg.CreateMap(entity, dto).ReverseMap();
                        }
                    }
                }

                cfg.CreateMap<CourseReadModel, CourseBasicInformationsDTO>();
                cfg.CreateMap<CourseModuleReadModel, CourseModuleBasicInformationsDTO>();
                cfg.CreateMap<LessonReadModel, LessonBasicInformationsDTO>();

                cfg.CreateMap<CourseReadModel, CourseDetailsDTO>()
                    .ForMember(
                        dto => dto.Tags,
                        opt => opt.MapFrom(e => e.Tags.Select(tag => tag.Tag.Name).ToList())
                        );
                cfg.CreateMap<CourseModuleReadModel, CourseModuleDetailsDTO>();
                cfg.CreateMap<LessonReadModel, LessonDetailsDTO>();

                cfg.CreateMap<CourseReadModel, CourseForEditionDTO>();
                cfg.CreateMap<CourseModuleReadModel, CourseModuleForEditionDTO>();
                cfg.CreateMap<LessonReadModel, LessonForEditionDTO>();

                cfg.CreateMap<CourseReadModel, CoursePageItemDTO>()
                .ForMember(
                    dto => dto.Tags,
                    opt => opt.MapFrom(e => e.Tags.Select(tag => tag.Tag.Name).ToList())
                    );

                cfg.CreateMap<UserProfile, UserProfileDTO>()
                    .ForMember(dto => dto.GenderName, opt => opt.MapFrom(up => up.Gender.Name));

                cfg.CreateMap<Course, CourseReadModel>()
                    .ForMember(t => t.Tags, opt => opt.Ignore());

                cfg.CreateMap<Lesson, LessonReadModel>();
                cfg.CreateMap<CourseModule, CourseModuleReadModel>();
                cfg.CreateMap<ApplicationUser, UserBasic>();
            });

            var dtoMapper = new DTOMapper(config);
            var mapper = new Mapper(config);

            builder.RegisterInstance(dtoMapper).As<IDTOMapper>();
            builder.RegisterInstance(mapper).As<IMapper>();
        }
    }
}
