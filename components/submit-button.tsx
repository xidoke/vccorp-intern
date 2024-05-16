import React from 'react';
import { useFormStatus } from 'react-dom';
import {Button} from "@/components/ui/button";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      disabled={pending}
    >
      {pending ? 'Submitting...' : 'Submit'}

    </Button>
  );
};

export default SubmitButton;
