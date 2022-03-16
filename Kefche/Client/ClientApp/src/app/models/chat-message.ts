export class ChatMessage {
    
    constructor(connectionId: string | null, text: string) {
        this.ConnectionId = connectionId;
        this.Text = text;
        this.DateTime = new Date();
    }

    ConnectionId: string | null;
    Text: string;
    DateTime: Date;
}
