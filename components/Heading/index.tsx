import LogoImage from "@/components/LogoImage";
import {NavigationMenuDemo} from "@/components/NavigationMenu";
import {Button} from "@/components/ui/button";
import React from "react";

export function Heading() {
    return <div className="flex w-full h-full justify-between items-center gap-40 py-4 px-10 bg-white">
        <LogoImage/>
        <div className="flex gap-10">
            <NavigationMenuDemo/>
            <Button>Sign up</Button>
        </div>
    </div>;
}