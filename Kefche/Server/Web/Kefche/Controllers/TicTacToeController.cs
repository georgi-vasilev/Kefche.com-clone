namespace Kefche.Controllers
{
    using System.Threading.Tasks;
    using Controllers.Base;
    using Hubs;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.SignalR;

    public class TicTacToeController : ApiController
    {
        private readonly IHubContext<ChatHub> hubContext;

        public TicTacToeController(IHubContext<ChatHub> hubContext)
        {
            this.hubContext = hubContext;
        }

        //[HttpPost]
        //public async Task SendTurnAsync(TurnInfo turn) 
        //    => await this.hubContext.Clients.Client(turn.ConnectionId).SendAsync("turnReceivedFromApi", turn.Cell);
    }
}
