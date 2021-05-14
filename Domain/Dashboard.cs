using System;

namespace Domain
{
    public class Dashboard
    {
        public Guid Id { get; set; }   
        public DateTime Date { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
    }
        
}