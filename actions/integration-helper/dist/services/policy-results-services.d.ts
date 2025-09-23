import { Inputs } from '../inputs';
import * as VeracodePolicyResult from '../namespaces/VeracodePolicyResult';
export declare function preparePolicyResults(inputs: Inputs): Promise<void>;
export declare function postScanReport(inputs: Inputs, policyFindings: VeracodePolicyResult.Finding[]): Promise<void>;
