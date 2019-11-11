using System;
using System.Collections.Generic;
using System.Text;
using WebApp.Data;

namespace KursyTutoriale.Domain.Entites
{
    public class Course : BaseEntity
    {
        public string title { get; set; }
        public string content { get; set; }
        public string authorId { get; set; }
        public DateTime date { get; set; }
    }
}
