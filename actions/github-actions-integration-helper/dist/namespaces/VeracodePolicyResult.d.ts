export interface Finding {
    issue_id: number;
    description: string;
    violates_policy: boolean;
    finding_status: {
        resolution: string;
        resolution_status: string;
        status: string;
    };
    finding_details: {
        severity: number;
        cwe: {
            id: number;
            name: string;
        };
        file_path: string;
        file_line_number: number;
    };
}
export interface Embedded {
    findings: Finding[];
}
export interface ResultsData {
    page: {
        size: number;
        total_elements: number;
    };
    _embedded: Embedded;
}
