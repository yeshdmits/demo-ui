import React from 'react';


const Button = ({ children, handleClick, className }) => {
    return <button className={className} onClick={handleClick}>{children}</button>
}

export default Button;