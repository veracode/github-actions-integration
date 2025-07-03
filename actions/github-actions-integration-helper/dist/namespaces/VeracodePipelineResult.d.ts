interface File {
    source_file: {
        file: string;
        line: number;
        function_name: string;
    };
}
export interface Finding {
    title: string;
    issue_id: number;
    severity: number;
    issue_type_id: string;
    issue_type: string;
    cwe_id: string;
    files: File;
    display_text: string;
}
export interface ResultsData {
    scan_id: string;
    modules: string[];
    findings: Finding[];
}
export {};
