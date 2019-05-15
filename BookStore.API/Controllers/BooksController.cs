using System.Threading.Tasks;
using BookStore.API.Data;
using BookStore.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private readonly DataContext  _context;
        public BooksController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetBooks([FromQuery] Book book)
        {
            var books = await _context.Books.ToListAsync();
            return Ok(books);
        }

        [HttpGet("{id}", Name="GetBook")]
        public async Task<IActionResult> GetBook(int id)
        {
            var book = await _context.Books.FirstOrDefaultAsync(b => b.Id == id);
            return Ok(book);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Book book)
        {
            _context.Books.Add(book);
            await _context.SaveChangesAsync();
            
             return CreatedAtAction(nameof(GetBooks), new { id = book.Id }, book);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Book book)
        {
            if (id != book.Id)
            {
                return BadRequest();
            }

            try
            {
                _context.Entry(book).State = EntityState.Modified;
                _context.Update(book);
                await _context.SaveChangesAsync();

                 return CreatedAtAction(nameof(GetBooks), new { id = book.Id }, book);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var book = await _context.Books.SingleOrDefaultAsync(b => b.Id == id);

             if (book == null)
            {
                return NotFound();
            }

            _context.Remove(book);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool BookExists(int id)
        {
            return _context.Books.Find(id) != null;
        }
    }
}