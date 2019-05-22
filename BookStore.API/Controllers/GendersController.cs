using System.Threading.Tasks;
using BookStore.API.Data;
using BookStore.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookStore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GendersController : ControllerBase
    {
        private readonly DataContext  _context;
        public GendersController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetGenders([FromQuery] Gender gender)
        {
            var genders = await _context.Genders.ToListAsync();
            return Ok(genders);
        }

        [HttpGet("{id}", Name="GetGender")]
        public async Task<IActionResult> GetGender(int id)
        {
            var gender = await _context.Genders.FirstOrDefaultAsync(b => b.Id == id);
            return Ok(gender);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Gender gender)
        {
            _context.Genders.Add(gender);
            await _context.SaveChangesAsync();
            
             return CreatedAtAction(nameof(GetGenders), new { id = gender.Id }, gender);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Gender gender)
        {
            if (id != gender.Id)
            {
                return BadRequest();
            }

            try
            {
                _context.Entry(gender).State = EntityState.Modified;
                _context.Update(gender);
                await _context.SaveChangesAsync();

                 return CreatedAtAction(nameof(GetGenders), new { id = gender.Id }, gender);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!GenderExists(id))
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
            var gender = await _context.Genders.SingleOrDefaultAsync(b => b.Id == id);

             if (gender == null)
            {
                return NotFound();
            }

            _context.Remove(gender);
            await _context.SaveChangesAsync();

            return Ok();
        }

        private bool GenderExists(int id)
        {
            return _context.Genders.Find(id) != null;
        }
    }
}