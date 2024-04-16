import React from "react";
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
    const navigate = useNavigate();

    const callProductList = () => {
        navigate("/process/list")
    }

    return (
        <div className="hello-acc-header" onClick={callProductList}>
            Create Product
        </div>

    );
}

export default CreateProduct;