
using clothingAPI.Models;
using clothingAPI.Dto;
using clothingAPI.Services;
using clothingAPI.Data;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
using Microsoft.AspNetCore.Authorization;

namespace clothingAPI.Controllers.ProfileControllers
{
    [ApiController]
    [Route("api/profile")]
    public class ProfileController : ControllerBase
    {

        private readonly ApplicationDbContext _context;

        public ProfileController(ApplicationDbContext context)
        {
            _context = context;
        }
        

        [HttpPut("update")]
        public async Task<IActionResult> UpdateData([FromBody] UserDto user)
        {


            int userId = user.Id;

            var currentUser = await _context.Users.FindAsync(userId);

            if (currentUser == null)
                return NotFound();

            currentUser.SurName = user.Surname;
            currentUser.Name = user.Name;
            currentUser.Email = user.Email;

            if (!string.IsNullOrWhiteSpace(user.BirthDay))
            {
                if (DateTime.TryParseExact(user.BirthDay, "dd.MM.yyyy HH:mm", CultureInfo.InvariantCulture, DateTimeStyles.AssumeLocal, out DateTime parsedDate))
                {
                    currentUser.Date = parsedDate.ToUniversalTime(); 
                }
                else
                {
                    currentUser.Date = DateTime.UtcNow;
                }

            }

            await _context.SaveChangesAsync();

            return Ok(new { answer = true });
        }
        [HttpPut("adress")]
        public async Task<IActionResult> Adress([FromBody] AdressDto adress)
        {
            var currentUser = await _context.Users.FindAsync(adress.UserId);

            if(currentUser == null) 
                return NotFound();

            var currentAdress = await _context.Adresses.FirstOrDefaultAsync(a => a.UserId == adress.UserId);

            if (currentAdress != null)
            {
                currentAdress.City = adress.City;
                currentAdress.Street = adress.Street;
                currentAdress.House = adress.House;
                currentAdress.Apartament = adress.Apartament;
            }

            else
            {
                currentAdress = new Adress
                {
                    City = adress.City,
                    Street = adress.Street,
                    House = adress.House,
                    Apartament = adress.Apartament
                };
                currentUser.Adresses = new List<Adress> { currentAdress };
            }


            await _context.SaveChangesAsync();

            return Ok(new { answer = true });
        }

        [HttpPut("password")]
        public async Task<IActionResult> Change([FromBody] PasswordDto passwordDto)
        {
            if (passwordDto == null)
                return NotFound();

            var currentUser = await _context.Users.FindAsync(passwordDto.UserId);

            if (currentUser == null) 
                return NotFound();


            var hashNewPassword = PasswordService.HashPassword(passwordDto.NewPassword);

            currentUser.Password = hashNewPassword;

            await _context.SaveChangesAsync();

           return Ok(new {answer = true});

        }

}
}
