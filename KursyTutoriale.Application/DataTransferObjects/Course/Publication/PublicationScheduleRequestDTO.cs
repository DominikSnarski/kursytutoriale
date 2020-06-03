using System;

namespace KursyTutoriale.Application.DataTransferObjects.Course.Publication
{
    public class PublicationScheduleRequestDTO
    {
        public DateTime DateOfPublication { get; set; }
        public Guid CourseId { get; set; }
    }
}
