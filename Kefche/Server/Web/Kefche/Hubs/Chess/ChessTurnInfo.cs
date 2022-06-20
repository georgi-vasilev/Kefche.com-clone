namespace Kefche.Hubs.Chess
{
    using System.Collections.Generic;

    public class ChessTurnInfo
    {
        public string SessionId { get; set; }

        public string ConnectionId { get; set; }
        public string Fen { get; set; }
        public List<object> MoveList { get; set; }
    }
}
