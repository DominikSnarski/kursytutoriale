﻿using KursyTutoriale.Domain.Entities.Course;
using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Application.DataTransferObjects.Course
{
    public class CourseDetailsDTO
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool Public { get; set; }
        public int Verified { get; set; }
        public float Price { get; set; }
        public Guid OwnerId { get; set; }
        public DateTime Date { get; set; }
        public int Popularity { get; set; }
        public double Rating { get; set; }
        public int Progress { get; set; }
        public ICollection<string> Tags { get; set; }
        public List<CourseModuleBasicInformationsDTO> Modules { get; set; }
        public string Image { get; set; }
    }
}
