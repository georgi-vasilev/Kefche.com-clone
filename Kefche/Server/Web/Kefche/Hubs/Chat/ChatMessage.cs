namespace Kefche.Hubs
{
    using System;

    public class ChatMessage
    {
        public string ConnectionId { get; set; }

        public string Text { get; set; }

        public DateTime DateTime { get; set; }
    }
}
