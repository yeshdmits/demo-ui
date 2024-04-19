import React, { useState } from "react";
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
// import './display-styles.css';
// import './screen-styles.css';
import { useLocation, useNavigate } from "react-router-dom";
const uiSchema = '{"boolean":{"radio":{"ui:widget":"radio"},"select":{"ui:widget":"select"}},"string":{"textarea":{"ui:widget":"textarea","ui:options":{"rows":5}},"placeholder":{"ui:placeholder":"This is a placeholder"},"color":{"ui:widget":"color"}},"secret":{"ui:widget":"hidden"},"disabled":{"ui:disabled":true},"readonly":{"ui:readonly":true},"widgetOptions":{"ui:options":{"backgroundColor":"yellow"}},"selectWidgetOptions":{"ui:options":{"backgroundColor":"pink"}}}'

const DisplayJsonFormDialog = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const [draftSchema, setDraftSchema] = useState<string>(JSON.stringify(state.schema, undefined, 2));
    const [schema, setSchema] = useState<any>(state.schema);
    const [errorMsg, setErrorMsg] = useState<any>(null);
    const [formData, setFormData] = useState<any>({});

    const handleChange = (value: any) => {
        setFormData(value)
    }

    const handleSchemaSave = () => {
        let newFormData = { ...state.formData };

        newFormData.tasks[state.taskId].schema = JSON.stringify(schema)
        navigate("/builder", {
            state: {
                formData: newFormData,
                taskId: state.taskId
            }
        });
        // handleSchemaChange(JSON.stringify(schema));
        // onClose();
    }
    const handleClose = () => {
        navigate("/builder", {
            state: {
                taskId: state.taskId,
                formData: state.formData
            }
        });
        // navigate
        // handleSchemaChange(JSON.stringify(schema));
        // onClose();
    }

    const handleSchemaApply = () => {
        try {
            setSchema(JSON.parse(draftSchema))
            setDraftSchema(JSON.stringify(state.schema, undefined, 2))
            setErrorMsg(null);
        } catch (error: any) {
            setErrorMsg(error.message);
        }
    }

    const handleSchemaInputChange = (e: any) => {
        setDraftSchema(e.target.value);
    }

    const handleSchemaReset = () => {
        setDraftSchema(JSON.stringify(state.schema, undefined, 2));
        setErrorMsg(null);
    }


    return (
        <div className="dialog-form">
            <div className="dialog-header">
                <h2>Form Here</h2>
            </div>
            <div className="dialog-content">
                <div className="dialog-schema">
                    <div className="dialog-schema-actions">
                        <div
                            className="dialog-reset"
                            onClick={handleSchemaReset}
                        >Reset</div>

                        <div
                            className="dialog-apply"
                            onClick={handleSchemaApply}
                        >Apply</div>
                    </div>
                    <div className="error-msg">{errorMsg}</div>
                    <textarea
                        className="dialog-textarea"
                        value={draftSchema}
                        onChange={handleSchemaInputChange}
                        rows={10}
                        cols={50}
                    />
                </div>
                <div className="dialog-json-form">
                    <Form
                        schema={schema}
                        validator={validator}
                        uiSchema={JSON.parse(uiSchema)}
                        formData={formData}
                        liveOmit={true}
                        // widgets={getWidgets()}
                        liveValidate
                        showErrorList={false}
                        onChange={(e) => handleChange(e.formData)}
                        children={
                            <div>
                            </div>
                        }
                    />
                </div>
            </div>
            <div className="dialog-footer">
                <div className="dialog-cancel" onClick={handleClose}>Cancel</div>

                <div className="dialog-save" onClick={handleSchemaSave}>Save</div>
            </div>
        </div>
    );
}

export default DisplayJsonFormDialog;