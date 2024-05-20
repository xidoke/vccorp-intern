import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { actionSignIn } from '@/actions/login';

const Social = () => {
  const gitHubSignIn = actionSignIn.bind(null, 'github');
  return (
    <div className="flex w-full items-center gap-x-2">
      <Button size="lg" className="w-full" variant="outline">
        <FcGoogle className="h-6 w-6" />
        &nbsp;Continue with Google
      </Button>
      <form action={gitHubSignIn}>
        <Button size="lg" className="w-full" variant="outline">
          <FaGithub className="h-4 w-3" />
          &nbsp;Continue with Github
        </Button>
      </form>
    </div>
  );
};

export default Social;
