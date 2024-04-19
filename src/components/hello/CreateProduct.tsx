import React from "react";
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
    const navigate = useNavigate();

    const callProductList = () => {
        navigate("/process/list")
    }

    return (
        <div className="text-3xl bg-slate-100 rounded-t-lg px-5 min-h-24 flex justify-center items-center hover:cursor-pointer hover:bg-slate-300" onClick={callProductList}>
            Create Product
        </div>

    );
}

export default CreateProduct;