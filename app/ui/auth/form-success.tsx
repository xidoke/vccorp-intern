import React from 'react';
import {CheckCircleIcon} from "@heroicons/react/24/outline";
import {CheckCircle} from "lucide-react";

interface FormSuccessProps {
    message? : string
}
const FormSuccess = ({ message } : FormSuccessProps) => {
    if (!message) return null
    return (
        <div className="bg-primary/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-primary">
            <CheckCircleIcon className="h-4 w-4"/>
            <span>{message}</span>
        </div>
    );
};

export default FormSuccess;