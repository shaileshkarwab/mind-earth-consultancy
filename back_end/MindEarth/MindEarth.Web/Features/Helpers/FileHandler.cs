namespace MindEarth.Web.Features.Helpers
{
    public static class FileHandler
    {
        public static void DeleteFile(string folderFilePath)
        {
            var filePath = $"{Directory.GetCurrentDirectory()}\\uploaddata\\{folderFilePath}";
            if (System.IO.File.Exists(filePath)) { 
                System.IO.File.Delete(filePath);
            }
        }

        public static bool IsFileAvailable(string folderFilePath)
        {
            var filePath = $"{Directory.GetCurrentDirectory()}\\uploaddata\\{folderFilePath}";
            return System.IO.File.Exists(filePath);
        }
    }
}
