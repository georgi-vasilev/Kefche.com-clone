export class TurnInfo {
    
    constructor(connectionId: string, sessionId: string, cell: number) {
        this.ConnectionId = connectionId;
        this.SessionId = sessionId;
        this.Cell = cell;
    }

    ConnectionId: string;
    SessionId: string;
    Cell: number;
}
