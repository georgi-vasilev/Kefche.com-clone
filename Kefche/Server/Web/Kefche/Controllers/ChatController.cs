namespace Kefche.Controllers
{
    using System.Threading.Tasks;
    using Controllers.Base;
    using Hubs;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.SignalR;

    public class ChatController : ApiController
    {
        private readonly IHubContext<ChatHub> hubContext;

        public ChatController(IHubContext<ChatHub> hubContext)
        {
            this.hubContext = hubContext;
        }

        [HttpPost]
        public async Task SendMessage(ChatMessage message) 
            => await this.hubContext.Clients.All.SendAsync("messageReceivedFromApi", message);
    }
}
