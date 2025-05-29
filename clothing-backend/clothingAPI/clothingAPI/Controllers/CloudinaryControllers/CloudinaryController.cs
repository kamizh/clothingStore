using Microsoft.AspNetCore.Mvc;
using clothingAPI.Services;
using clothingAPI.Models;
using System.Net;


namespace clothingAPI.Controllers.CloudinaryControllers
{

    [ApiController]
    [Route("api/upload")]
    public class CloudinaryController : Controller
    {


        private CloudinaryService _cloudinaryService;

        public CloudinaryController()
        {

            _cloudinaryService =  new CloudinaryService();

        }

        [HttpPost]
        public async Task<ActionResult> UploadImage(IFormFile file)
        {
            if(file == null || file.Length == 0)
            {
                return BadRequest();
            }

            var url = _cloudinaryService.UploadImageAsync(file);




            return Ok(new { imageUrl = url });
        }


    }
}
