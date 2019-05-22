using System;

namespace BookStore.API.Models
{
    public class Book
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Author { get; set; }
        public string Description { get; set; }
        public double Value { get; set; }
        public DateTime PublishDate { get; set; }
        public int GenderId { get; set; }
        public virtual Gender Gender { get; set; }
    }
}