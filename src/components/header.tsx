"use client"

import {SignedIn, SignedOut, SignInButton, UserButton, useUser} from "@clerk/nextjs";
import {Breadcrumbs} from "@/components/breadcrumbs";
import Image from "next/image";

export const Header = () => {
    const {user} = useUser();

    return (
        <div className={"flex items-center justify-between p-5"}>
            {user && (
                <h1 className={"text-2xl flex justify-center items-center gap-x-2 font-semibold"}>
                    <Image src={"/logo.svg"} alt={"logo"} className={"h-10 w-10"} height={10} width={10} />
                    {user?.firstName}{`'s`} Space
                </h1>
            )}

            <Breadcrumbs/>
            <div>
                <SignedOut>
                    <SignInButton/>
                </SignedOut>

                <SignedIn>
                    <UserButton/>
                </SignedIn>
            </div>
        </div>
    )
}