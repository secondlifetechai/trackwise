/* eslint-disable @next/next/no-img-element */
"use client";

import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import useUser from '@/hooks/useUser';
import { useParams, usePathname, useRouter } from 'next/navigation';
import supabase from '@/config/Supabase_Client';
import Link from 'next/link';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import Snippet from '../Snippet';

function UserHeader() {
    const [user] = useUser();
    const pathname = usePathname();
    const { website } = useParams();
    const router = useRouter();

    const logOut = async () => {
        await supabase.auth.signOut();
        router.push("/signin");
    };

    if (user == "no user") {
        return <></>;
    }
    
    return (
        <nav className="fixed w-full z-20 top-0 start-0 border-b border-gray-800 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="TrackWise Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">TrackWise</span>
                </a>

                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    
                    {pathname !== "/dashboard" && (
                    <>
                        {website && (
                            <Dialog>
                                <DialogTrigger className="text-sm text-white/60 hover:text-white smooth">
                                snippet
                                </DialogTrigger>
                                <DialogContent
                                className="bg-black bg-opacity-10 filter backdrop-blur-md
                                text-white min-h-[400px] border border-white/5 outline-none"
                                >
                                <DialogHeader className="">
                                    <DialogTitle className="py-6">
                                    add this snippet to your website
                                    </DialogTitle>
                                    <DialogDescription
                                    className="items-center
                                    justify-center flex border border-white/5 "
                                    >
                                    <Snippet />
                                    </DialogDescription>
                                </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        )}
                        <Link href={'/dashboard'} className="hover:opacity-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mr-16">Dashboard</Link>
                    </>)}

                    <DropdownMenu>
                        <DropdownMenuTrigger className="text-white outline-none p-0 m-0 border-none">
                            <div className="flex space-x-2 items-center justify-center hover:opacity-50">
                            <p className="text-sm">
                                {user?.user_metadata.full_name.split(" ")[0]}
                            </p>
                            <img
                                className="h-8 w-8 rounded-full"
                                src={user?.user_metadata.avatar_url}
                                alt="name"
                            />
                            </div>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                            className="bg-[#0a0a0a] border-white/5 outline-none
                        text-white bg-opacity-20 backdrop-blur-md filter"
                        >
                            <DropdownMenuLabel className="text-white">
                            settings
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-white/5" />
                            <Link href="/settings" prefetch>
                            <DropdownMenuItem
                                className="text-white/60
                            smooth cursor-pointer rounded-md"
                            >
                                API
                            </DropdownMenuItem>
                            </Link>
                            <Link href="/settings" prefetch>
                            <DropdownMenuItem
                                className="text-white/60
                            smooth cursor-pointer rounded-md"
                            >
                                Guide
                            </DropdownMenuItem>
                            </Link>

                            <DropdownMenuSeparator className="bg-white/5" />
                            <DropdownMenuItem
                            onClick={logOut}
                            className="text-white/60
                            smooth cursor-pointer rounded-md"
                            >
                            Log out
                            </DropdownMenuItem>
                        </DropdownMenuContent>

                    </DropdownMenu>

                    <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                </div>

            </div>
        </nav>
    )
}

export default UserHeader