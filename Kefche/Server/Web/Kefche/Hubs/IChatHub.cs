namespace Kefche.Hubs
{
    using System.Threading.Tasks;

    public interface IChatHub
    {
        Task MessageReceivedFromHub(ChatMessage message);

        Task NewUserConnected(string message);
    }
}
