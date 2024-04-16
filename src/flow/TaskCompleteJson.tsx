import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { completeTask } from "../service/ApiService";


const TaskCompleteJson = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { schema, taskId, taskName, readOnly, taskFormData } = state;
    const [formData, setFormData] = useState<any>(taskFormData);
    const [isFormValid, setIsFormValid] = React.useState(false);

    const handleChange = (value: any) => {
        setFormData(value)
        setIsFormValid(validator.isValid(schema, value, schema));
    }

    const handleSubmit = () => {
        if (isFormValid && !readOnly) {
            console.log(state.processId);
            completeTask({
                taskId: taskId,
                formData: JSON.stringify(formData),
                decision: formData.decision === undefined ? "completed" : formData.decision === "Approved" ? "completed" : 'rejected'
            }).then(() => navigate("/process",
                {
                    state: {
                        processId: state.processId
                    }
                }
            ))

        }

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

    return (
        <div className="task-complete-form">
            <div className="product-title">{taskName}</div>
            <div className="dialog-json-task">
                <Form
                    schema={schema}
                    validator={validator}
                    // uiSchema={JSON.parse(uiSchema)}
                    formData={formData}
                    liveOmit={true}
                    // widgets={getWidgets()}
                    disabled={readOnly}
                    liveValidate
                    showErrorList={false}
                    onChange={(e) => handleChange(e.formData)}
                    children={
                        <div className="product-form-submit">
                            <div className="product-button-cancel" onClick={handleCancel}>Cancel</div>
                            <div className={`product-button ${!isFormValid || readOnly ? 'disabled' : ''}`} onClick={handleSubmit}>Submit</div>
                        </div>
                    }
                />
            </div>
        </div>
    );
}

export default TaskCompleteJson;