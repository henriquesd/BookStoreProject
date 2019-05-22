using System.Collections.Generic;

namespace BookStore.API.Models
{
    public class Gender
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public virtual ICollection<Book> Books { get; set; }
    }
}