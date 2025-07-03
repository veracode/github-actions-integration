export declare enum Conclusion {
    Success = "success",
    Failure = "failure",
    Neutral = "neutral",
    Cancelled = "cancelled",
    TimedOut = "timed_out",
    ActionRequired = "action_required",
    Skipped = "skipped"
}
export declare enum Status {
    Queued = "queued",
    InProgress = "in_progress",
    Completed = "completed"
}
export interface Annotation {
    path: string;
    start_line: number | null;
    end_line: number | null;
    annotation_level: string;
    title: string;
    message: string;
}
export interface ChecksStatic {
    owner: string;
    repo: string;
    check_run_id: number;
    status: Status;
}
export interface OctokitResponse {
    id: number;
}
