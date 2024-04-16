import React, { useEffect, useState, } from "react";
import { getProductList, createProduct } from "../service/ApiService";
import "./ProcessList.css"
import { useNavigate } from 'react-router-dom';
import { formatDate } from "../service/Utils";

const ProcessList = () => {
    const [productList, setProductList] = useState<any>([]);
    const navigate = useNavigate();

    const handleOpenProduct = (product: any) => {
        navigate("/process", {
            state: {
                processId: product.processEntityId
            }
        });
    }

    const handleAddNew = () => {
        createProduct()
            .then((responseData: any) => {
                navigate("/process", {
                    state: {
                        processInstanceId: responseData.processInstanceId
                    }
                });
            });
    }

    useEffect(() => {
        const fetchDataFromApi = async () => {
            try {
                const fetchedData = await getProductList(); // Call fetchData function
                setProductList(fetchedData);
            } catch {
                console.log("Fail")
            }
        };

        fetchDataFromApi();
    }, []);
    return (
        <div>
            <div className="process-list-header">
                <div className="process-list-add" onClick={handleAddNew}>Add new</div>
            </div>
            <div className="process-list-container">
                <div className="process-list-item-head">
                    <div>Product Name</div>
                    <div>Status</div>
                    <div>Last Action</div>
                    <div>Updated By</div>
                </div>
                {productList.length !== 0 && productList.map((product: any, id: number) =>
                    <div key={id} className="process-list-item" onClick={() => handleOpenProduct(product)}>
                        <div>{product.displayName}</div>
                        <div>{product.processStatus}</div>
                        <div>{formatDate(product.modifiedAt)}</div>
                        <div>{product.modifiedBy}</div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProcessList;