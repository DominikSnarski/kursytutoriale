﻿using KursyTutoriale.Domain.Entities.Course;
using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Application.DataTransferObjects.Course
{
    public class CourseForEditionDTO
    {
        public Guid Id { get; set; }    
        public string Title { get; set; }
        public string Description { get; set; }
        public Guid OwnerId { get; set; }
        public DateTime Date { get; set; }
        public ICollection<CourseTag> Tags { get; set; }
        public ICollection<CourseModuleForEditionDTO> Modules { get; set; }
    }
}
