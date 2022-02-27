namespace Kefche.Hubs
{
    using System;

    public class ChatMessage
    {
        public string Text { get; set; }

        public string ConnectionId { get; set; }

        public DateTime DateTime { get; set; }
    }
}
