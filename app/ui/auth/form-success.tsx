import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

interface FormSuccessProps {
  message?: string;
}
const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) return null;
  return (
    <div className="flex items-center gap-x-2 rounded-md bg-primary/15 p-3 text-sm text-primary">
      <CheckCircleIcon className="h-4 w-4" />
      <span>{message}</span>
    </div>
  );
};

export default FormSuccess;
