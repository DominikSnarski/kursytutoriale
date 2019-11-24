
﻿namespace KursyTutoriale.Domain.Entities.Course
{
    public class Tag:BaseEntity
    {
        private Tag():base()
        {

        }

        public Tag(string name):base()
        {
            Name = name;
        }

        public string Name { get; private set; }

    }
}
