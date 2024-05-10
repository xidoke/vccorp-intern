import { FunctionComponent } from 'react';
import Image from 'next/image';

const LogoImage: FunctionComponent = () => {
  return (
    <div className="inline-flex h-[37px] w-[314px] items-center justify-center">
      <Image src="/logo.png" alt="logo" width="314" height="37" />
    </div>
  );
};

export default LogoImage;
