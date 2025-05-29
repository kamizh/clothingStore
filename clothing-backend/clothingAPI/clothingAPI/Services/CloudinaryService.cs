using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;

public class CloudinaryService
{
    private readonly Cloudinary _cloudinary;

    public CloudinaryService()
    {
        var account = new Account(
            "dr0auhn0v",
            "835921725855965",
            "K4QyEdtqb6BcVA71eaewuh5wH80"
        );

        _cloudinary = new Cloudinary(account);
    }

    public async Task<string> UploadImageAsync(IFormFile file)
    {
        using var stream = file.OpenReadStream();
        var uploadParams = new ImageUploadParams()
        {
            File = new FileDescription(file.FileName, stream),
            Folder = "products"
        };

        var result = await _cloudinary.UploadAsync(uploadParams);
        return result.SecureUrl.ToString();
    }

    public async Task DeleteImageAsync(string imageUrl)
    {
        var publicId = GetPublicIdFromUrl(imageUrl);
        if (!string.IsNullOrEmpty(publicId))
        {
            var deletionParams = new DeletionParams(publicId);
            await _cloudinary.DestroyAsync(deletionParams);
        }
    }

    private string GetPublicIdFromUrl(string imageUrl)
    {
        try
        {
            var uri = new Uri(imageUrl);
            var parts = uri.AbsolutePath.Split('/');

            var fileName = parts.Last(); 
            var publicId = Path.Combine(parts[^2], Path.GetFileNameWithoutExtension(fileName)); 

            return publicId.Replace("\\", "/");
        }
        catch
        {
            return null;
        }
    }


}
