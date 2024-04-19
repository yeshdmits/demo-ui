import React from 'react';
import { useNavigate } from 'react-router-dom';

class CustomError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype);
        this.statusCode = statusCode;
    }
}

export { CustomError };


const ErrorComponet = (props: any) => {
    const navigate = useNavigate();
    console.log(props.error.response)
    return (
        <div className='flex min-h-screen items-center justify-around flex-col bg-gray-100'>
            {(props.error.response.status === 401 || props.error.response.status === 403) &&
                <div className='bg-red-400 rounded-full text-wrap px-6 text-center min-h-24 flex items-center text-white'>
                    You don't have access to view this page. Please contact administrator</div>
            }
            <div className='bg-white rounded-full text-wrap px-2 text-center min-h-16 flex items-center border hover:cursor-pointer hover:bg-slate-100'
                onClick={() => navigate('/')}
            >
                Go to Home Page
            </div>
        </div>
    );
}

export default ErrorComponet;
