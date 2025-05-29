using adminPanel.Models;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.IO;
using System.Threading.Tasks;

namespace adminPanel.Services
{
    public static class CloudinaryService
    {
        private static Cloudinary cloudinary = new Cloudinary(new Account("dr0auhn0v", "835921725855965", "K4QyEdtqb6BcVA71eaewuh5wH80"));

        public static async Task<CloudImage> UploadImageAsync(string filePath)
        {
            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(filePath),
                Folder = "variants"
            };

            var uploadResult = await cloudinary.UploadAsync(uploadParams);

            return new CloudImage
            {
                Url = uploadResult.SecureUrl.ToString(),
                PublicId = uploadResult.PublicId
            };
        }

        public static async Task<bool> DeleteImageAsync(string imageUrl)
        {
            var publicId = GetPublicIdFromUrl(imageUrl);

            var deletionParams = new DeletionParams(publicId);
            var result = await cloudinary.DestroyAsync(deletionParams);
            return result.Result == "ok";
        }

        private static string GetPublicIdFromUrl(string imageUrl)
        {
            try
            {
                var uri = new Uri(imageUrl);
                var parts = uri.AbsolutePath.Split('/');

                var fileName = parts.Last();
                var publicId = Path.Combine(parts[parts.Length - 2], Path.GetFileNameWithoutExtension(fileName));

                return publicId.Replace("\\", "/");
            }
            catch
            {
                return null;
            }
        }

    }
}
