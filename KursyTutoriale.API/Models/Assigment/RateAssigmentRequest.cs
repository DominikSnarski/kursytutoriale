using System;
using System.ComponentModel.DataAnnotations;

namespace KursyTutoriale.API.Models.Assigment
{
    public class RateAssigmentRequest
    {
        [Required]
        public Guid AssignmetId { get; set; }
        [Required]
        [Range(0,5)]
        public int Rate { get; set; }
    }
}
