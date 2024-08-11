interface AuthorizeParams {
    client_id: string;
    response_type: string;
    scope: string;
    redirect_uri: string;
}

export class AuthorizeData {
    client_id: string;
    response_type: string;
    scope: string[];
    redirect_uri: string;
    constructor(params: AuthorizeParams) {
        this.client_id = params.client_id;
        this.response_type = params.response_type;
        this.scope = params.scope.split(" ");
        this.redirect_uri = params.redirect_uri;
    }
}