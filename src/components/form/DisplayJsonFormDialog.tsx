import React, { useState } from "react";
import Form from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import './display-styles.css';
import './screen-styles.css';
const uiSchema = '{"boolean":{"radio":{"ui:widget":"radio"},"select":{"ui:widget":"select"}},"string":{"textarea":{"ui:widget":"textarea","ui:options":{"rows":5}},"placeholder":{"ui:placeholder":"This is a placeholder"},"color":{"ui:widget":"color"}},"secret":{"ui:widget":"hidden"},"disabled":{"ui:disabled":true},"readonly":{"ui:readonly":true},"widgetOptions":{"ui:options":{"backgroundColor":"yellow"}},"selectWidgetOptions":{"ui:options":{"backgroundColor":"pink"}}}'
     
const DisplayJsonFormDialog = (props: any) => {
    const [draftSchema, setDraftSchema] = useState<string>(JSON.stringify(props.schema, undefined, 2));
    const [schema, setSchema] = useState<any>(props.schema);
    const [errorMsg, setErrorMsg] = useState<any>(null);
    const { isOpen, onClose, handleSchemaChange } = props;
    const [formData, setFormData] = useState<any>({});

    const handleChange = (value: any) => {
        setFormData(value)
    }

    const handleSchemaSave = () => {
        handleSchemaChange(JSON.stringify(schema));
        onClose();
    }

    const handleSchemaApply = () => {
        try {
            setSchema(JSON.parse(draftSchema))
            setDraftSchema(JSON.stringify(props.schema, undefined, 2))
            setErrorMsg(null);
        } catch (error: any) {
            setErrorMsg(error.message);
        }
    }

    const handleSchemaInputChange = (e: any) => {
        setDraftSchema(e.target.value);
    }

    const handleSchemaReset = () => {
        setDraftSchema(JSON.stringify(props.schema, undefined, 2));
        setErrorMsg(null);
    }


    return (
        <dialog aria-modal='true' open={isOpen} className={isOpen ? 'json-form-container' : ''}>
            {isOpen &&
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
                            <textarea
                                className="dialog-textarea"
                                value={draftSchema}
                                onChange={handleSchemaInputChange}
                                rows={10}
                                cols={50}
                            />
                            <div className="error-msg">{errorMsg}</div>
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
                        <div className="dialog-cancel" onClick={onClose}>Cancel</div>

                        <div className="dialog-save" onClick={handleSchemaSave}>Save</div>
                    </div>
                </div>
            }
        </dialog>
    );
}

export default DisplayJsonFormDialog;