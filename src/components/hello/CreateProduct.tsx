import React from "react";
import { createProduct } from "../../service/ApiService";
import { useNavigate } from 'react-router-dom';

const CreateProduct = () => {
    const navigate = useNavigate();

    const callCreateProcuct = () => {
        createProduct()
        .then((responseData: any) => {
            navigate("/process", {
                state: {
                    processInstanceId: responseData.processInstanceId,
                }
            });
        })
    }

    return(
        <div onClick={callCreateProcuct}>
            Create Product
        </div>
    );
}

export default CreateProduct