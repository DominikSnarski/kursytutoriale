using KursyTutoriale.Application.Contracts;
using KursyTutoriale.Application.DataTransferObjects.Course;
using KursyTutoriale.Application.DataTransferObjects.NewCourse;
using KursyTutoriale.Application.DataTransferObjects.NewCourse.CourseEdit;
using KursyTutoriale.Domain.Entities.Course;
using KursyTutoriale.Domain.Entities.Course.Events;
using KursyTutoriale.Domain.Entities.CoursePublication;
using KursyTutoriale.Infrastructure.Repositories;
using KursyTutoriale.Infrastructure.Repositories.Interfaces;
using KursyTutoriale.Shared;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using URF.Core.Abstractions;

namespace KursyTutoriale.Application.Services.CourseParticipants
{
    public class CourseParticipantsService : ICourseParticipantsService
    {

        private IUnitOfWork unitOfWork;
        private IDTOMapper mapper;
        private ICourseRepository courseRepository;

        private IExtendedRepository<CourseParticipant> participantRepository;

        public CourseParticipantsService(
            IUnitOfWork unitOfWork,
            IDTOMapper mapper,
            ICourseRepository courseRepository,
            IExtendedRepository<CourseParticipant> participantRepository)
        {
            this.unitOfWork = unitOfWork;
            this.mapper = mapper;
            this.courseRepository = courseRepository;
            this.participantRepository = participantRepository;
        }

        public async Task<bool> JoinCourse(CourseParticipantDTO dto)
        {
            var query = participantRepository.Queryable();
            var result = query.Where(cp => cp.CourseId.Equals(dto.CourseId) && cp.UserId.Equals(dto.UserId)).FirstOrDefault();
            if (result != null)
            {
                return false;
            }

            CourseParticipant cp = new CourseParticipant()
            {
                CourseId = dto.CourseId,
                UserId = dto.UserId,
                Date = DateTime.Now
            };

            participantRepository.Insert(cp);
            if (await unitOfWork.SaveChangesAsync() > 0) return true;
            else return false;


        }
        public async Task<bool> LeaveCourse(CourseParticipantDTO dto)
        {
            var query = participantRepository.Queryable();
            var result = query.Where(cp => cp.CourseId.Equals(dto.CourseId) && cp.UserId.Equals(dto.UserId)).FirstOrDefault();

            if (result != null)
            {
                participantRepository.Delete(result);
            }

            if (await unitOfWork.SaveChangesAsync() > 0) return true;
            else return false;
        }
        public bool IsParticipating(CourseParticipantDTO dto)
        {
            var query = participantRepository.Queryable();
            var result = query.Where(cp => cp.CourseId.Equals(dto.CourseId) && cp.UserId.Equals(dto.UserId)).FirstOrDefault();

            if (result != null) return true;
            else return false;
        }
    }
}
