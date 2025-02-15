"use client";

import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";
import { FC } from "react";
import NextTopLoader from "nextjs-toploader";

export const Providers: FC<React.PropsWithChildren> = ({ children }): JSX.Element => {
    return (
        <>
            <SessionProvider>{children}</SessionProvider>
            <Toaster />
            <NextTopLoader />
        </>
    );
};
