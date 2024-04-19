import React, { useEffect, useState, } from "react";
import { getProductList, createProduct } from "../service/ApiService";
import { useNavigate } from 'react-router-dom';
import { formatDate } from "../service/Utils";
import ErrorComponet from "../components/login/ErrorComponent";

const ProcessList = () => {
    const [productList, setProductList] = useState<any>([]);
    const [error, setError] = useState<any>(null);
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
            getProductList()
                .then(data => setProductList(data))
                .catch(error => setError(error)); // Call fetchData function
        };
        fetchDataFromApi();
    }, []);
    return (
        <div>
            {!error &&
                <div>
                    <div className="">
                        <div className="rounded-lg bg-slate-400 flex justify-center py-4 text-white hover:bg-slate-600 hover:cursor-pointer" 
                        onClick={handleAddNew}>Add new</div>
                    </div>
                    <div className="w-full">
                        <div className="mt-4 bg-gray-200 px-2 py-4 rounded-t-lg">
                            <div className="grid grid-cols-4 gap-4">
                                <div className="p-3 flex items-center hover:cursor-default">Product Name</div>
                                <div className="p-3 flex items-center hover:cursor-default">Status</div>
                                <div className="p-3 flex items-center hover:cursor-default">Last Action</div>
                                <div className="p-3 flex items-center hover:cursor-default">Updated By</div>
                            </div>
                        </div>
                        <div className="mt-4">
                        {productList.length !== 0 && productList.map((product: any, id: number) =>
                            <div key={id} 
                            className="grid grid-cols-4 gap-4 border-t border-gray-300 py-2 cursor-pointer hover:bg-gray-100" 
                            onClick={() => handleOpenProduct(product)}>
                                <div className="p-3 flex items-center">{product.displayName}</div>
                                <div className="p-3 flex items-center">{product.processStatus}</div>
                                <div className="p-3 flex items-center">{formatDate(product.modifiedAt)}</div>
                                <div className="p-3 flex items-center">{product.modifiedBy}</div>
                            </div>
                        )}
                        </div>
                    </div>
                </div>
            }
            {error && <ErrorComponet error={error} />}
        </div>
    );
}

export default ProcessList;