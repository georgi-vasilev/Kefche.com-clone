export class ChatMessage {
    
    constructor(connectionId: string | null, text: string) {
        this.connectionId = connectionId;
        this.text = text;
        this.dateTime = new Date();
    }

    connectionId: string | null;
    text: string;
    dateTime: Date;
}
