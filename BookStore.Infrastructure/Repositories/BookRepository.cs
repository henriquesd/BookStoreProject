using BookStore.Domain.Interfaces;
using BookStore.Domain.Models;
using BookStore.Infrastructure.Contexts;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BookStore.Infrastructure.Repositories
{
    public class BookRepository : IBookRepository
    {
        private readonly BookStoreContext _context;

        public BookRepository(BookStoreContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Book>> GetBooks()
        {
            var books = await _context.Books.Include(b => b.Category).ToListAsync();
            return books;
        }
        public async Task<Book> GetBook(int id)
        {
            return await _context.Books.Include(b => b.Category).FirstOrDefaultAsync(b => b.Id == id);
        }

        public async Task Post(Book book)
        {
            _context.Books.Add(book);
            await _context.SaveChangesAsync();
        }

        public async Task Put(Book book)
        {
            _context.Entry(book).State = EntityState.Modified;
            _context.Update(book);
            await _context.SaveChangesAsync();
        }

        public async Task Delete(int id)
        {
            var book = await _context.Books.SingleOrDefaultAsync(b => b.Id == id);

            if (book != null)
            {
                _context.Remove(book);
                await _context.SaveChangesAsync();
            }
        }

        public bool BookExists(int id)
        {
            return _context.Books.Find(id) != null;
        }
    }
}