"use client";

import { useEffect, useState } from "react";
import { auth } from "@/auth";
import { Session } from "next-auth";

export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth()
      .then((session) => {
        setSession(session);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return { data: session, status: loading ? "loading" : "authenticated" };
}