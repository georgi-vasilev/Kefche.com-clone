using System;

namespace Kefche.Models
{
    public class Session
    {
        public Guid SessionId { get; set; }
        public string CreatorId { get; set; }
        public string InvitedId { get; set; }
    }
}
