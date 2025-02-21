"use client";

import Button from "@/components/Button";
import supabase from "@/config/Supabase_Client";
import { GalleryVerticalEnd } from "lucide-react"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignInPage() {

    const router = useRouter();

    //   signin the user with google provider
    const signIn = async () => {
        if (typeof window !== "undefined") {
            const protocol = window.location.protocol;
            const hostname = window.location.hostname;

            // Check if hostname is localhost to determine protocol
            const redirectTo =
                hostname === "localhost"
                ? `${protocol}//${hostname}:3000/dashboard`
                : `${protocol}//${hostname}/dashboard`;

            await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: redirectTo,
                },
            });
        }
    };

    //   check if the user is logged in already and redirect if necassary
    const catchUser = async () => {
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (user) {
            if (user.role === "authenticated") router.push("/dashboard");
        }
    };

    useEffect(() => {
        if (!supabase) return;
        catchUser();
    }, [supabase]);

    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
            <a href="/" className="flex items-center gap-2 self-center font-medium mb-6">
                <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                    <GalleryVerticalEnd className="size-4" />
                </div>
                TrackWise Inc.
            </a>
            
            <Button onClick={signIn} icon="/google.png">SignIn With Google</Button>
        </div>
        </div>
    )
}