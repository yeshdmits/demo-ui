import React, { Component, ErrorInfo, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

class CustomError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        Object.setPrototypeOf(this, CustomError.prototype);
        this.statusCode = statusCode;
    }
}

export { CustomError };


const ErrorComponent = () => {
    const {state} = useLocation();
    return (
        <div>{state.error.message}</div>
    );
}

export default ErrorComponent;
