import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardDescription,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import BackButton from '@/app/ui/auth/back-button';
import Social from '@/app/ui/auth/social';

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  description: string;
  backButtonHref: string;
  backButtonLabel: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,
  backButtonHref,
  backButtonLabel,
  showSocial,
  description,
}: CardWrapperProps) => {
  return (
    <Card className="shadow-2xl">
      <CardHeader>
        <CardTitle className="text-center">{headerLabel}</CardTitle>
        <CardDescription className="text-center">{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && (
        <CardFooter className="flex flex-col items-center">
          <div className="mb-3 flex w-full items-center text-gray-400">
            <div className="w-full border border-gray-200"></div>
            <p className="mx-2">or</p>
            <div className="w-full border border-gray-200"></div>
          </div>
          <Social />
        </CardFooter>
      )}
      <CardFooter>
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  );
};
