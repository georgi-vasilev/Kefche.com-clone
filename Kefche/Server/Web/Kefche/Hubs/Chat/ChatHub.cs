namespace Kefche.Hubs
{
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.SignalR;

    public class ChatHub : Hub<IChatHub>
    {
        public async Task BroadcastAsync(ChatMessage message)
            => await this.Clients.All.MessageReceivedFromHub(message);

        public override async Task OnConnectedAsync() 
            => await this.Clients.All.NewUserConnected("a new user connectd");
    }
}
