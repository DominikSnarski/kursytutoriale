using System;
using System.Collections.Generic;
using System.Text;
using WebApp.Data;

namespace KursyTutoriale.Domain.Entites
{
    public class Course : BaseEntity
    {
        public string Title { get; set; }
        public string Content { get; set; }
        public Guid AuthorId { get; set; }
        public DateTime Date { get; set; }
    }
}
