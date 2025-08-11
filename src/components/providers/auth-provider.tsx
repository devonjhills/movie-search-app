"use client";

import { createContext, useContext } from "react";
import { useSession, signIn, signOut, signUp } from "@/lib/auth-client";
import type { User, Session } from "@/lib/auth";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, name?: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isPending: loading } = useSession();
  const user = session?.user ?? null;

  const signInWithEmail = async (email: string, password: string) => {
    const result = await signIn.email({
      email,
      password,
    });
    if (result.error) {
      throw new Error(result.error.message);
    }
  };

  const signUpWithEmail = async (email: string, password: string, name?: string) => {
    const result = await signUp.email({
      email,
      password,
      name: name || email.split('@')[0], // Use email prefix as default name
    });
    if (result.error) {
      throw new Error(result.error.message);
    }
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <AuthContext.Provider
      value={{ 
        user, 
        session, 
        loading, 
        signInWithEmail, 
        signUpWithEmail, 
        signOut: handleSignOut 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
