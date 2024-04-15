import React from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { completeTask } from "../service/ApiService";

const TaskCompleteCustom = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { componentProps, taskId, taskName } = state;

    const handleSubmit = async () => {
        completeTask({
            taskId: taskId,
            decision: "completed"
        }).then(() => navigate("/process",
            {
                state: {
                    processInstanceId: state.processInstanceId
                }
            }
        ))
    }

    const handleCancel = () => {
        navigate("/process",
            {
                state: {
                    processInstanceId: state.processInstanceId
                }
            }
        );
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
                        <div className='button-view'>view</div>
                    </div>
                </div>
            )}
            <div className="product-form-custom-submit">
                <div className="product-button-cancel" onClick={handleCancel}>Cancel</div>
                <div className='product-button' onClick={handleSubmit}>Submit</div>
            </div>
        </div>
    );
}

export default TaskCompleteCustom;