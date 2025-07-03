interface Policy {
    guid: string;
    name: string;
    policy_compliance_status: string;
}
interface Profile {
    name: string;
    policies: Policy[];
}
export interface Application {
    guid: string;
    profile: Profile;
}
export interface ResultsData {
    page: {
        size: number;
        total_elements: number;
    };
    _embedded: {
        applications: Application[];
    };
}
export interface SandboxResultsData {
    page: {
        size: number;
        total_elements: number;
    };
    _embedded: {
        sandboxes: Sandbox[];
    };
}
export interface Sandbox {
    guid: string;
    name: string;
}
export interface SelfUserResultsData {
    api_credentials: {
        expiration_ts: string;
    };
}
export interface policyResultsData {
    page: {
        size: number;
        total_elements: number;
    };
}
export {};
