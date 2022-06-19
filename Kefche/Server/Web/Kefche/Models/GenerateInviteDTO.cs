namespace Kefche.Models
{
    using System;

    public class ConnectionIdDTO
    {
        public string ConnectionId { get; set; }
    }

    public class AcceptDTO
    {
        public string ConnectionId { get; set; }

        public Guid SessionId { get; set; }
    }
}
