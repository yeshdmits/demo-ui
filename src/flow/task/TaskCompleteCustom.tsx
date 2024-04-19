import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { completeTask } from "../../service/ApiService";
import ViewPdfComponent from "./ViewPdfComponent";
import { formatDate } from "../../service/Utils";


const TaskCompleteCustom = () => {
    const [viewDoc, setViewDoc] = useState<any>(null);
    const [showPdf, setShowPdf] = useState<boolean>(false);
    const { state } = useLocation();
    const navigate = useNavigate();
    const { componentProps, taskId, taskName } = state;

    const handleSubmit = async () => {
        console.log(state.processId);
        completeTask({
            taskId: taskId,
            decision: "completed"
        }).then(() => navigate("/process",
            {
                state: {
                    processId: state.processId
                }
            }
        ));
    }

    const handleCancel = () => {
        navigate("/process",
            {
                state: {
                    processId: state.processId
                }
            }
        );
    }

    const renderDocument = (doc: any) => {
        setShowPdf(true);
        setViewDoc(doc);
    }

    return (
        <div className="task-complete-form">
            <div className="product-container">
                <div className="flex justify-center items-center text-2xl mt-6 rounded-t-[2rem] bg-slate-300 min-h-20">
                    {taskName}
                </div>
                <div className="">
                    <div className="bg-gray-200 px-2 py-4">
                        <div className="grid grid-cols-4 gap-4">
                            <div className="flex items-center justify-center hover:cursor-default">
                                Document Name
                            </div>
                            <div className="flex items-center justify-center hover:cursor-default">
                                Status
                            </div>
                            <div className="flex items-center justify-center hover:cursor-default">
                                Last Action
                            </div>
                            <div className="flex items-center justify-center hover:cursor-default">
                                Updated By
                            </div>
                            {/* <th></th> */}
                        </div>
                    </div>
                    <div>
                        {componentProps && componentProps.map((doc: any, id: number) =>
                            <div key={id} onClick={() => renderDocument(doc)}
                                className="grid grid-cols-4 gap-4 border-t border-gray-300 py-2 cursor-pointer hover:bg-gray-100">
                                <div className="p-3 flex items-center justify-center">
                                    {doc.documentName}
                                </div>
                                <div className="p-3 flex items-center justify-center">
                                    {doc.documentStatus}
                                </div>
                                <div className="p-3 flex items-center justify-center">
                                    {formatDate(doc.modifiedAt)}

                                </div>
                                <div className="p-3 flex items-center justify-center">
                                    {doc.modifiedBy}
                                </div>
                                {/* <div className="table-cell">
                                    <div className='button-view' onClick={() => renderDocument(doc)}>view</div>
                                </div> */}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div>
                {showPdf && <ViewPdfComponent viewDoc={viewDoc} />}
            </div>
            <div className="flex flex-col-reverse min-h-48 items-center justify-around">
                <div className="w-full flex items-center justify-center min-h-14 bg-slate-300 rounded-full"
                    onClick={handleCancel}>
                    Cancel
                </div>
                <div className='w-full flex items-center justify-center min-h-14 text-white rounded-full bg-green-600'
                    onClick={handleSubmit}>
                    Submit
                </div>
            </div>
        </div>
    );
}

export default TaskCompleteCustom;