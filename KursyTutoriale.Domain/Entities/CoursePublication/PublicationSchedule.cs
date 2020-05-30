using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Domain.Entities.CoursePublication
{
    public class PublicationSchedule : BaseEntity
    {
        public PublicationSchedule()
        {

        }
        public PublicationSchedule(Guid CourseId, DateTime DateOfPublication)
        {
            this.CourseId = CourseId;
            this.DateOfPublication = DateOfPublication;
        }
        public DateTime DateOfPublication { get; set; }
        public bool Published { get; set; }
        public Guid CourseId { get; set; }
    }
}
