import * as VeracodeApplication from '../namespaces/VeracodeApplication';
import { Inputs } from '../inputs';
export declare function getApplicationByName(appname: string, vid: string, vkey: string): Promise<VeracodeApplication.Application>;
export declare function removeSandbox(inputs: Inputs): Promise<void>;
export declare function validateVeracodeApiCreds(inputs: Inputs): Promise<string | void>;
export declare function validatePolicyName(inputs: Inputs): Promise<void>;
export declare function registerBuild(inputs: Inputs): Promise<void>;
