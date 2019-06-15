using System.Collections.Generic;

namespace BookStore.Domain.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public virtual ICollection<Book> Books { get; set; }
    }
}