
using System;
using System.Drawing;
using System.IO;

namespace KursyTutoriale.Infrastructure.Services
{

    public interface IFileService
    {
        byte[] ImageToByteArray(string imageIn);
        string ByteArrayToImage(byte[] byteArrayIn);
    }

    public class FileService : IFileService
    {
        public byte[] ImageToByteArray(string imageIn)
        {
            return Convert.FromBase64String(imageIn);
        }

        public string ByteArrayToImage(byte[] byteArrayIn)
        {
            return Convert.ToBase64String(byteArrayIn);
        }
    }
}
