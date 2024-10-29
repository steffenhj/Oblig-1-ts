import type { ResultFn } from "@/types";
import { ApiError } from "./error";

export const ResultHandler: ResultFn = {

  success(data) {
    return { success: true, data };
  },

  failure(error: unknown, code = "INTERNAL_SERVER_ERROR") {
    let err = ""; 

    if (typeof error === "string") err = error;
    if (typeof error === "object" && err !== null) err = JSON.stringify(error);
    if (error instanceof Error) err = error.message;

    return { success: false, error: { message: err, code } };
  },
};