using System;

namespace KursyTutoriale.Domain.Entities.Assignments
{
    public class AssignmentRate
    {
        public AssignmentRate(int rate)
        {
            Rate = rate;
        }

        public Guid Id { get; set; }
        public int Rate { get; private set; }
    }
}
