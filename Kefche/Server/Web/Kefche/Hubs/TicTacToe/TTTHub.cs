namespace Kefche.Hubs
{
    using System;
    using System.Threading.Tasks;
    using Kefche.Controllers;
    using Microsoft.AspNetCore.SignalR;

    public class TTTHub : Hub<ITTTHub>
    {
        public async Task SendTurnAsync(TurnInfo turn)
        {
            var sessionId = Guid.Parse(turn.SessionId);
            var clientId = InviteController.GetSecondPlayerConnectionId(turn.ConnectionId, sessionId);

            await this.Clients.Client(clientId).TurnReceivedFromHub(turn);
        }
    }
}
