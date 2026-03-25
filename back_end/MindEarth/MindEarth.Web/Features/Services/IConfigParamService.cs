namespace MindEarth.Web.Features.Services
{
    public interface IConfigParamService
    {
        string GetWebPath();

        string[] ValidFileExtensions();
    }
}
