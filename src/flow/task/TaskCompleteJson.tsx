import React, { useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { completeTask } from "../../service/ApiService";
import './custom-rjsf-styles.css';


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
        <div>
            <div className="flex justify-center items-center text-2xl mt-6 rounded-t-[2rem] bg-slate-300 min-h-20">
                {taskName}
            </div>
            <div className="w-full flex justify-center">
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
                        <div className="flex flex-col-reverse min-h-48 items-center justify-around">
                            <div className="w-full flex items-center justify-center min-h-14 bg-slate-300 rounded-full"
                                onClick={handleCancel}>Cancel</div>
                            <div className={`w-full flex items-center justify-center min-h-14 text-white rounded-full ${!isFormValid || readOnly ? 'bg-green-300' : 'bg-green-600'}`}
                                onClick={handleSubmit}>Submit</div>
                        </div>
                    }
                />
            </div>
        </div>
    );
}

export default TaskCompleteJson;