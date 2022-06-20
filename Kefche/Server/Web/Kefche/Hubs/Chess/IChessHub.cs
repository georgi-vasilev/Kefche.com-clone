namespace Kefche.Hubs.Chess
{
    using System.Threading.Tasks;

    public interface IChessHub
    {
        Task TurnReceivedFromHub(ChessTurnInfo turn);
    }
}
