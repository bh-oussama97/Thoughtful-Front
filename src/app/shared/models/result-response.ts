export interface ResultResponse<T> {
    body: T | null;
    error: Error | null;
    isSuccess: boolean;
}

export interface Error {
    message: string;
    code: string;
}