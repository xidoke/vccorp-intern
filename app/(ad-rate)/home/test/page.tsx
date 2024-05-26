import React from 'react';
import {auth} from "@/auth";

const TestPage = async () => {
    const session = await auth()
    return (
        <div>
            {JSON.stringify(session)}
        </div>
    );
};

export default TestPage;