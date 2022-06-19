namespace Kefche.Hubs
{
    using System.Threading.Tasks;

    public interface ITTTHub
    {
        Task TurnReceivedFromHub(int cell);
    }
}
