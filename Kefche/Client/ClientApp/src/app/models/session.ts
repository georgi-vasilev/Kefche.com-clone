export class Session {
    
    constructor(CreatorId: string, SessionId: string, InvitedId: string) {
        this.creatorId = CreatorId;
        this.sessionId = SessionId;
        this.invitedId = InvitedId;
    }

    creatorId: string;
    sessionId: string;
    invitedId: string;
}
