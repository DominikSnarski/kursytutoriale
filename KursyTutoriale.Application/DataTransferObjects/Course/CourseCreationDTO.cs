﻿using KursyTutoriale.Domain.Entities.Course;
using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Application.DataTransferObjects.Course
{
    public class CourseCreationDTO
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public ICollection<TagCreationDTO> Tags { get; set; }

    }
}
