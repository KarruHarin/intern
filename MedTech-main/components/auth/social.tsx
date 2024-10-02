"use client";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";
import { FaFacebook } from 'react-icons/fa';
import { FcGoogle } from "react-icons/fc";

import { IconType } from 'react-icons';

export const Social = () => {
    interface ButtonWithIconProps {
        label: string;
        Icon: IconType;
        onClick: () => void;
    }

    const onClick = (provider: "google" | "facebook") => {
        signIn(provider, {
            callbackUrl: DEFAULT_LOGIN_REDIRECT
        });
    }

    const ButtonWithIcon: React.FC<ButtonWithIconProps> = ({ label, Icon, onClick }) => (
        <div
            className="flex w-full items-center justify-center bg-white border rounded-md shadow-sm cursor-pointer hover:bg-gray-100 py-2 mx-0 my-2"
            onClick={onClick}
        >
            <Icon className="w-5 h-5 mr-2" />
            <span className="text-base">{label}</span>
        </div>
    );

    return (
        <div className="flex space-x-2 w-full lg:flex-row flex-col">
            <ButtonWithIcon
                label="Sign up with Google"
                Icon={FcGoogle}
                onClick={() => onClick("google")}
            />
        </div>
    );
}
