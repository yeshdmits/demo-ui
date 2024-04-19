import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { completeTask } from "../service/ApiService";
import ViewPdfComponent from "./ViewPdfComponent";
import "./ProcessOverview.css"

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

                <div className="product-title">{taskName}</div>
                <table className="product-table">
                    <thead>
                        <tr className="table-row">
                            <th className="table-head">Document Name</th>
                            <th className="table-head">Status</th>
                            <th className="table-head">Last Action</th>
                            <th className="table-head">Updated By</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {componentProps && componentProps.map((doc: any, id: number) =>
                            <tr key={id} className="table-row">
                                <td className="table-cell">{doc.documentName}</td>
                                <td className="table-cell">{doc.documentStatus}</td>
                                <td className="table-cell">{doc.modifiedAt}</td>
                                <td className="table-cell">{doc.modifiedBy}</td>
                                <td className="table-cell">
                                    <div className='button-view' onClick={() => renderDocument(doc)}>view</div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div>
                {showPdf && <ViewPdfComponent viewDoc={viewDoc} />}
            </div>
            <div className="product-form-submit">
                <div className="product-button-cancel" onClick={handleCancel}>Cancel</div>
                <div className='product-button' onClick={handleSubmit}>Submit</div>
            </div>
        </div>
    );
}

export default TaskCompleteCustom;