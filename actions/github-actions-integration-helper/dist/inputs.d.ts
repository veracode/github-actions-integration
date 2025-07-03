import { InputOptions } from '@actions/core';
type GetInput = (name: string, options?: InputOptions | undefined) => string;
export declare enum Actions {
    GetPolicyNameByProfileName = "getPolicyNameByProfileName",
    PreparePipelineResults = "preparePipelineResults",
    PreparePolicyResults = "preparePolicyResults",
    RemoveSandbox = "removeSandbox",
    ValidateVeracodeApiCreds = "validateVeracodeApiCreds",
    ValidatePolicyName = "validatePolicyName",
    registerBuild = "registerBuild"
}
export type Inputs = {
    action: Actions;
    vid: string;
    vkey: string;
    appname: string;
    token: string;
    check_run_id: number;
    source_repository: string;
    fail_checks_on_policy: boolean;
    fail_checks_on_error: boolean;
    sandboxname: string;
    policyname: string;
    path: string;
    start_line: number;
    end_line: number;
    break_build_invalid_policy: boolean;
    filter_mitigated_flaws: boolean;
    check_run_name: string;
    head_sha: string;
    branch: string;
    event_type: string;
    issue_trigger_flow: string;
    workflow_app: boolean;
    line_number_slop: number;
    pipeline_scan_flaw_filter: string;
    filtered_results_file: string;
};
export declare const parseInputs: (getInput: GetInput) => Inputs;
export declare const vaildateScanResultsActionInput: (inputs: Inputs) => boolean;
export declare const vaildateRemoveSandboxInput: (inputs: Inputs) => boolean;
export declare const ValidatePolicyName: (inputs: Inputs) => boolean;
export declare const ValidateVeracodeApiCreds: (inputs: Inputs) => boolean;
export {};
