using Kefche.Controllers.Base;
using Kefche.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Concurrent;
using System.Linq;

namespace Kefche.Controllers
{
    public class InviteController : ApiController
    {
        static ConcurrentBag<Session> Sessions = new();

        [HttpPost]
        public IActionResult GenerateInvite(ConnectionIdDTO caller)
        {
            var session = Sessions.FirstOrDefault(x => x.CreatorId == caller.ConnectionId && x.InvitedId == null);
            if (session != null)
                return Ok(session);

            session = new Session
            {
                CreatorId = caller.ConnectionId,
                SessionId = Guid.NewGuid(),
            };

            Sessions.Add(session);

            return Ok(session);
        }

        [HttpPost]
        [Route("/accept")]
        public IActionResult AcceptInvite(AcceptDTO request)
        {
            var session = Sessions.FirstOrDefault(x => x.SessionId == request.SessionId);
            if (session == null)
                return BadRequest();

            session.InvitedId = request.ConnectionId;
            return Ok(session);
        }

        internal static string GetSecondPlayerConnectionId(string connectionId, Guid sessionId)
        {
            var session = Sessions.FirstOrDefault(x => x.SessionId == sessionId);

            if (session.CreatorId == connectionId)
                return session.InvitedId;

            if (session.InvitedId == connectionId)
                return session.CreatorId;
            
            return null;
        }
    }
}
