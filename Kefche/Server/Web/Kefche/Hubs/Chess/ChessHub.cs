namespace Kefche.Hubs.Chess
{
    using System;
    using System.Threading.Tasks;
    using Kefche.Controllers;
    using Microsoft.AspNetCore.SignalR;

    public class ChessHub : Hub<IChessHub>
    {
        public async Task SendTurnAsync(ChessTurnInfo turn)
        {
            var sessionId = Guid.Parse(turn.SessionId);
            var clientId = InviteController.GetSecondPlayerConnectionId(turn.ConnectionId, sessionId);

            await this.Clients.Client(clientId).TurnReceivedFromHub(turn);
        }
    }
}
