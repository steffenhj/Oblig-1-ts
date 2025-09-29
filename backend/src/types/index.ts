import type { ErrorCode } from "@/lib/error";
import { User } from "@/features/users/types/types";

type Project = {
    id: string;
    title: string;
    description: string;
    categories: string[];
    tags: string[];
    public: boolean;
    published_at: Date;
    participants: User[];
}

export type { Project }

export type Data<T> = {
    success: true;
    data: T;
};
  
type Err = {
    code: ErrorCode;
    message: string;
};
  
export type Error = {
    success: false;
    error: Err;
};
  
export type Result<T> = Data<T> | Error;

export type ResultFn = {
    success: <T>(data: T) => Data<T>;
    failure: (error: unknown, code: ErrorCode) => Error;
};

export type Entries<T> = {
    [K in keyof T]: [K, T[K]];
  }[keyof T][];