import { FunctionComponent } from 'react';
import Image from "next/image";


const LogoImage:FunctionComponent = () => {
    return (
        <div className="w-[314px] h-[37px] justify-center items-center inline-flex">
            <Image src="/logo.png" alt="logo" width="314" height="37"/>
        </div>
    )
};

export default LogoImage;
