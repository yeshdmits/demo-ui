import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { completeTask } from "../service/ApiService";
import ViewPdfComponent from "./ViewPdfComponent";

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
        ))
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
            <div className="product-title">{taskName}</div>
            {componentProps && componentProps.map((doc: any, id: number) =>
                <div key={id} className="customComponentList">
                    <div>
                        {doc.documentName}
                    </div>
                    <div>
                        {doc.documentStatus}
                    </div>
                    <div>
                        <div className='button-view' onClick={() => renderDocument(doc)}>view</div>
                    </div>
                </div>
            )}
            <div>
                {showPdf && <ViewPdfComponent viewDoc={viewDoc} />}
            </div>
            <div className="product-form-custom-submit">
                <div className="product-button-cancel" onClick={handleCancel}>Cancel</div>
                <div className='product-button' onClick={handleSubmit}>Submit</div>
            </div>
        </div>
    );
}

export default TaskCompleteCustom;