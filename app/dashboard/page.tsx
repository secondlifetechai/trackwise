/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Button from '@/components/Button';
import UserHeader from '@/components/sections/UserHeader';
import supabase from '@/config/Supabase_Client';
import useUser from '@/hooks/useUser';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function DashboardPage() {

    const [user] = useUser();
    const [websites, setWebsites] = useState<any>([]);
    const router = useRouter();

    const fetchWebsites = async () => {
        const { data, error } = await supabase
        .from("websites")
        .select()
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false });

        if (data) setWebsites(data);

        if (error) console.error(error);
    };

    useEffect(() => {
        if (!user || !supabase) return;
        fetchWebsites();
    }, [user, supabase]);

    useEffect(() => {
        if (!user) return;
        if (user == "no user") router.push("/signin");
    }, [user]);
    
    return (
        <>
            <UserHeader />
            <div className="flex min-h-svh flex-col items-center gap-6 bg-muted p-6 md:p-10 mt-8">
                <div
                className="w-full items-center justify-end flex p-6 border-b border-white/5 z-40" >
                <Link href={"/add"} prefetch>
                    <Button>+ Add Website</Button>
                </Link>{" "}
                </div>
                <div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full p-6 gap-10 z-40 "
                >
                {websites.map((website: any) => (
                    <Link key={website.id} href={`/w/${website.website_name}`}>
                    <div
                        className="border border-white/5 rounded-xl py-12 px-6
                    text-white w-full cursor-pointer smooth
                    hover:border-white/20 hover:bg-black-100"
                    >
                        <h2 className='text-center'> {website.website_name}</h2>
                    </div>
                    </Link>
                ))}
                </div>
            </div>
        </>
    )
}
