interface AppConfig {
    hostName: {
        veracode: {
            us: string;
            eu: string;
        };
        github: string;
    };
    api: {
        veracode: {
            applicationUri: string;
            findingsUri: string;
            sandboxUri: string;
            selfUserUri: string;
            policyUri: string;
        };
        github: '';
    };
}
declare const appConfig: AppConfig;
export default appConfig;
