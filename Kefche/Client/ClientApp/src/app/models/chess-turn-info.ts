export class ChessTurnInfo{
    constructor(connectionId: string, sessionId: string, fen: string, moveList: Array<any>) {
        this.ConnectionId = connectionId;
        this.SessionId = sessionId;
        this.Fen = fen;
        this.MoveList = moveList;
    }

    ConnectionId: string;
    SessionId: string;
    Fen: string;
    MoveList: Array<any>;
}