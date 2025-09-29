import { users } from '../../../data/users';
import type { User } from '../types/types';

const parseCookie = (cookie: string) => {
    return Object.fromEntries(
      cookie.split(";").map((cookie) => cookie.trim().split("="))
    );
  };
  
  export function getUser(request: Request): User | null {
    const cookies = parseCookie(request.headers.get("Cookie") ?? "");

    // Henter ut user.id cookie verdi
    const id = cookies["user.id"];
    const role = cookies["user.role"];

    const user = users.find((user) => user.id === id) ?? null;

    if (!user) {
        return null;
    }

    return {...user, role};
  }