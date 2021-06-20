using System;
using System.ComponentModel.DataAnnotations;

namespace Domain
{
    public class Dashboard
    {
        public Guid Id { get; set; }   
        public DateTime Date { get; set; }
        [Required]
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
    }
        
}