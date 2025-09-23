interface AuthorizationHeaderParams {
    id: string;
    key: string;
    host: string;
    url: string;
    method: string;
}
export declare function calculateAuthorizationHeader(params: AuthorizationHeaderParams): string;
export {};
