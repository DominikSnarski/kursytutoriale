using System;
using System.Collections.Generic;
using System.Text;

namespace KursyTutoriale.Domain.Entities
{
    public class Course : BaseEntity
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public Guid AuthorId { get; set; }
        public DateTime Date { get; set; }
    }
}
