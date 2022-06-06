export class AcceptInvite {
    
    constructor(connectionId: string | null, sessionId: string) {
        this.ConnectionId = connectionId;
        this.SessionId = sessionId;
    }

    ConnectionId: string | null;
    SessionId: string;
}
