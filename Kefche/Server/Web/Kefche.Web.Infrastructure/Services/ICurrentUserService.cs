namespace Kefche.Web.Infrastructure.Services
{
    public interface ICurrentUserService
    {
        string GetId();

        string GetUserName();
    }
}
