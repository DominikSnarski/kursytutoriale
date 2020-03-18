using Autofac;
using AutoMapper;
using KursyTutoriale.Application.DataTransferObjects.Course;
using KursyTutoriale.Application.DataTransferObjects.Tags;
using KursyTutoriale.Application.DataTransferObjects.UserProfiles;
using KursyTutoriale.Domain.Entities.Course;
using KursyTutoriale.Domain.Entities.UserProfiles;
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
                cfg.CreateMap<CourseReadModel, CourseBasicInformationsDTO>();
                cfg.CreateMap<CourseModuleReadModel, CourseModuleBasicInformationsDTO>();
                cfg.CreateMap<LessonReadModel, LessonBasicInformationsDTO>();

                cfg.CreateMap<CourseReadModel, CourseDetailsDTO>();
                cfg.CreateMap<CourseModuleReadModel, CourseModuleDetailsDTO>();
                cfg.CreateMap<LessonReadModel, LessonDetailsDTO>();

                cfg.CreateMap<CourseReadModel, CourseForEditionDTO>();
                cfg.CreateMap<CourseModuleReadModel, CourseModuleForEditionDTO>();
                cfg.CreateMap<LessonReadModel, LessonForEditionDTO>();

                cfg.CreateMap<Tag, TagDTO>();
                cfg.CreateMap<UserProfile, UserProfileDTO>()
                    .ForMember(dto => dto.GenderName, opt => opt.MapFrom(up => up.Gender.Name));


                cfg.CreateMap<Course, CourseReadModel>()
                .ForMember(t => t.Tags, opt => opt.Ignore());

                cfg.CreateMap<Lesson, LessonReadModel>();
                cfg.CreateMap<CourseModule, CourseModuleReadModel>();
            });

            var dtoMapper = new DTOMapper(config);
            var mapper = new Mapper(config);

            builder.RegisterInstance(dtoMapper).As<IDTOMapper>();
            builder.RegisterInstance(mapper).As<IMapper>();
        }
    }
}
