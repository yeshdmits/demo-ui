import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { completeTask } from "../service/ApiService";


const TaskCompleteJson = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { schema, taskId, taskName } = state;
    const [formData, setFormData] = useState<any>({});
    const [isFormValid, setIsFormValid] = React.useState(false);

    const handleChange = (value: any) => {
        setFormData(value)
        setIsFormValid(validator.isValid(schema, value, schema));
    }

    const handleSubmit = () => {
        if (isFormValid) {
            completeTask({
                taskId: taskId,
                formData: JSON.stringify(formData),
                decision: formData.decision === null ? "completed" : formData.decision === "Approved" ? "completed" : 'rejected'
            }).then(() => navigate("/process",
                {
                    state: {
                        processInstanceId: state.processInstanceId
                    }
                }
            ))

        }

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
            <div className="dialog-json-form">
                <Form
                    schema={schema}
                    validator={validator}
                    // uiSchema={JSON.parse(uiSchema)}
                    formData={formData}
                    liveOmit={true}
                    // widgets={getWidgets()}
                    liveValidate
                    showErrorList={false}
                    onChange={(e) => handleChange(e.formData)}
                    children={
                        <div className="product-form-submit">
                            <div className="product-button-cancel" onClick={handleCancel}>Cancel</div>
                            <div className={`product-button ${!isFormValid ? 'disabled' : ''}`} onClick={handleSubmit}>Submit</div>
                        </div>
                    }
                />
            </div>
        </div>
    );
}

export default TaskCompleteJson;