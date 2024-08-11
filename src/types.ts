export interface AuthorizeParams {
    client_id: string;
    response_type: string;
    scope: string;
    redirect_uri: string;
}

export interface ClientInfo {
    status: number;       // 默认为 200
    id: number;
    app_name: string;
    app_desc: string;
    client_id: string;
    allowed_scopes: string;
    redirect_uri: string;
}
