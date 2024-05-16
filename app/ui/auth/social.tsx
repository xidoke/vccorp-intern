'use client';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import {useToast} from "@/components/ui/use-toast";

const Social = () => {
    const { toast } = useToast();
    const handleClick = () => {
        toast({
            title: 'Error',
            description: "this feature is not available yet",
            variant: "destructive"
        })
    }
  return (
    <div className="flex w-full items-center gap-x-2">
      <Button size="lg" className="w-full" variant="outline" onClick={handleClick}>
        <FcGoogle className="h-6 w-6" />
        &nbsp;Continue with Google
      </Button>
      <Button size="lg" className="w-full" variant="outline" onClick={handleClick}>
        <FaGithub className="h-4 w-3" />
        &nbsp;Continue with Github
      </Button>
    </div>
  );
};

export default Social;
