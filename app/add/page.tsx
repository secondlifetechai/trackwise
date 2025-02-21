/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Button from '@/components/Button';
import UserHeader from '@/components/sections/UserHeader';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import supabase from '@/config/Supabase_Client';
import useUser from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function OnBoardingPage() {

    const [website, setWebsite] = useState("");
    const [loading, setLoading] = useState(false);
    const [user] = useUser();
    const [step, setStep] = useState(1);
    const router = useRouter();
    const [error, setError] = useState("");

    const addWebsite = async () => {
        if (website.trim() == "" || loading) return;
        setLoading(true);
        await supabase
        .from("websites")
        .insert([{ website_name: website.trim(), user_id: user.id }])
        .select();
        setLoading(false);
        setStep(2);
    };
    const checkDomainAddedBefore = async () => {
        let fetchedWebites : any = [];
        const { data: websites } = await supabase
        .from("websites")
        .select("*");
        fetchedWebites = websites;
        if (
        fetchedWebites.filter((item : any) => item.website_name == website).length > 0 // this means we have duplicates
        ) {
        setError("this domain is added before");
        } else {
        setError("");
        addWebsite();
        }
    };
    useEffect(() => {
        if (
        website.trim().includes("http") ||
        website.trim().includes("http://") ||
        website.trim().includes("https://") ||
        website.trim().includes("://") ||
        website.trim().includes(":") ||
        website.trim().includes("/")
        ) {
        setError("please enter the domain only. ie:(google.com)");
        } else {
        setError("");
        }
    }, [website]);

    return (
        <>
            <UserHeader />
            <div className="flex min-h-svh flex-col items-center gap-6 bg-muted p-6 md:p-10 mt-28">
            
                {step == 1 ? (
                <div className="items-center justify-center flex flex-col w-2/3 space-y-6">
                    <span className="w-full lg:w-[50%] group">
                        <p className="text-white/40 pb-4 group-hover:text-white smooth">
                            Domain
                        </p>
                        <Input
                            value={website}
                            onChange={(e) =>
                            setWebsite(e.target.value.trim().toLowerCase())
                            }
                            type="text"
                            className="input border-gray-700"
                        />
                        {error ? (
                            <p className="text-xs pt-2 font-light text-red-400">{error}</p>
                        ) : (
                            <p className="text-xs text-white/20 pt-2 font-light">
                            enter the domain or subdomain without {"www"}
                            </p>
                        )}
                    </span>
                    {error == "" && (
                    <Button onClick={checkDomainAddedBefore}>
                        {loading ? "adding..." : "add website"}
                    </Button>
                    )}
                </div>
                ) : (
                <div className="items-center justify-center flex flex-col w-2/3 space-y-6 mt-28">
                    <span className="w-full lg:w-[50%]">
                        <Textarea 
                            placeholder="Type your message here." 
                            className='cursor-pointer border-gray-700'
                            disabled
                            value={`<script defer data-domain="${website}"
                            src="https://monitoryour.website/tracking-script.js"></script>`} 
                        />
                        <p className="text-xs text-white/20 pt-2 font-light">
                            Paste this snippet in the{" "}
                            <b className="text-red-600">{"<head>"}</b> of your website.
                        </p>
                    </span>
                    <Button
                        onClick={() => router.push(`/w/${website.trim()}`)}
                    >
                        added
                    </Button>
                </div>
                )}
            </div>
        </>
    )
}
