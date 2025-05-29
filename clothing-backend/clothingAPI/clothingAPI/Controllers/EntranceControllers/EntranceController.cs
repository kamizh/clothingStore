using clothingAPI.Data;
using clothingAPI.Models;
using Microsoft.AspNetCore.Mvc;
using clothingAPI.Services;
using System.Text;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using clothingAPI.Dto;

namespace clothingAPI.Controllers.EntranceControllers
{

    [ApiController]
    [Route("api/Entrance")]
    public class EntranceController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly GenerateJWTToken _jwtToken;

        public EntranceController(ApplicationDbContext context, GenerateJWTToken generateJWT)
        {
            _context = context;
            _jwtToken = generateJWT;
        }


        [HttpPost("regist")]
        public IActionResult Regist(LoginDTO login)
        {
            if(login == null || login.Login.Length == 0 || login.Password.Length == 0)
            {
                return Ok(new {answer = false});
            }

            if(_context.Users.Any(p => p.Email == login.Login))
            {
                return Ok(new { answer = false });

            }

            var user = new User { Email = login.Login, Password = login.Password };
            user.DataRegistration = DateTime.UtcNow;

            user.Password = PasswordService.HashPassword(user.Password);

            _context.Users.Add(user);
            _context.SaveChanges();
            return Ok(new { answer = true });
        }

        [HttpPost("login")]
        public IActionResult Autorization(LoginDTO user)
        {
            if (user == null || user.Login.Length == 0 || user.Password.Length == 0)
            {
                return BadRequest(new { answer = false });
            }

            User current = _context.Users.FirstOrDefault(p => p.Email == user.Login);
            if (current == null) { return  BadRequest(new { answer = false }); }
            bool chechPassword = PasswordService.VerifyPassword(user.Password, current.Password);

            if (chechPassword)
            {
                var token = _jwtToken.CreateToken(current.Id, current.Email);
                return Ok(new { answer = true, token = token });
            }
            return Ok(new { answer = false });
        }

        [HttpGet("getAll")]
        public IActionResult getAllUsers()
        {
            return Ok(new { _context.Users });
        }

        [Authorize]
        [HttpGet("me")]
        public async Task<IActionResult> Me()
        {
            // 1. Достаём claim NameIdentifier
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier);

            if (userIdClaim == null)
                return Unauthorized(); // или NotFound

            int userId = Convert.ToInt32(userIdClaim.Value);


            var user = await _context.Users
                .Include(u => u.Adresses)
                .Where(u => u.Id == userId)
                .FirstOrDefaultAsync();

            if (user == null) 
                return NotFound();

            List<string> adresses = new List<string>();

            foreach(var ad in user.Adresses)
            {
                string adress = ad.City + ", " + ad.Street + ", " + ad.House + ", " + ad.Apartament;
                adresses.Add(adress);
            }


            var userDto = new UserDto
            {
                Id = user.Id,
                Adresses = adresses,
                BirthDay = user.Date.HasValue? user.Date.Value.ToShortDateString(): string.Empty,
                Email = user.Email,
                Name = user.Name,
                Surname = user.SurName,
                BonusCount = user.BonusCount,
            };

            return Ok(userDto);
        }


        

        public class LoginDTO
        {
            public string Login { get; set; }
            public string Password { get; set; }
        }


    }
}
