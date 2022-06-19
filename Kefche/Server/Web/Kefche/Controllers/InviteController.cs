namespace Kefche.Controllers
{
    using System;
    using System.Collections.Concurrent;
    using System.Linq;
    using Kefche.Controllers.Base;
    using Kefche.Hubs;
    using Kefche.Models;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.SignalR;

    public class InviteController : ApiController
    {
        private static ConcurrentBag<Session> sessions = new ();
        private readonly IHubContext<ChatHub, IChatHub> hub;

        public InviteController(IHubContext<ChatHub, IChatHub> hub)
        {
            this.hub = hub;
        }

        [HttpPost]
        public IActionResult GenerateInvite(ConnectionIdDTO caller)
        {
            var session = sessions.FirstOrDefault(x => x.CreatorId == caller.ConnectionId && x.InvitedId == null);
            if (session != null)
            {
                return this.Ok(session);
            }

            session = new Session
            {
                CreatorId = caller.ConnectionId,
                SessionId = Guid.NewGuid(),
            };

            sessions.Add(session);
            return this.Ok(session);
        }

        [HttpPost]
        [Route("/accept")]
        public IActionResult AcceptInvite(AcceptDTO request)
        {
            var session = sessions.FirstOrDefault(x => x.SessionId == request.SessionId);
            if (session == null)
            {
                return this.BadRequest();
            }

            session.InvitedId = request.ConnectionId;

            this.hub.Clients.All.MessageReceivedFromHub(new ChatMessage
            {
                ConnectionId = "Admin",
                DateTime = DateTime.Now,
                Text = "A new game just started",
            });
            var client = this.hub.Clients.Client(request.ConnectionId);

            return this.Ok(session);
        }

        internal static string GetSecondPlayerConnectionId(string connectionId, Guid sessionId)
        {
            var session = sessions.FirstOrDefault(x => x.SessionId == sessionId);

            if (session.CreatorId == connectionId)
            {
                return session.InvitedId;
            }

            if (session.InvitedId == connectionId)
            {
                return session.CreatorId;
            }

            return null;
        }
    }
}
