using BookStore.API.Models;
using Microsoft.EntityFrameworkCore;

namespace BookStore.API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base (options) { }

         public DbSet<Book> Books {get;set;}
         public DbSet<Gender> Genders {get;set;}
    }
}