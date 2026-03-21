namespace MindEarth.Web.Features.Services
{
    public class ConfigParamService : IConfigParamService
    {
        private readonly IConfiguration configuration;
        public ConfigParamService(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        public string GetWebPath()
        {
            return this.configuration.GetSection("AppSettings:WebPath").Get<string>();
        }

        public string[] ValidFileExtensions()
        {
            return this.configuration.GetSection("AppSettings:ValidFileExtensions").Get<string[]>();
        }
    }
}
