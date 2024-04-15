import React, { useState } from 'react';
import TaskListContainer from './TaskListContainer';
import { ReactComponent as ViewSvg } from '../svgs/open-process.svg';
import { ReactComponent as HideSvg } from '../svgs/close.svg';
import './screen-styles.css';
import './display-styles.css';
import { useLocation } from 'react-router-dom';


// "formData": "{\"full_name\":\"Random Chel\",\"date_of_birth\":\"1970-02-24\",\"income_source\":\"Business ownership\",\"account_purpose\":\"Personal savings\",\"transaction_frequency\":\"Monthly\",\"average_balance\":\">$10,000\",\"additional_services\":\"Investment advisory\",\"account_management_preference\":\"Mobile app\",\"specific_requirements\":\"Access to ATMs\",\"banking_familiarity\":\"Intermediate\"}",


// "formData": "{\"decision\": \"Approved\"}",
const initialFormData = {
    name: "Process",
    enabled: true,
    defaultValue: true,
    processDefinitionKey: 'defaultProductOpening',
    tasks: [
        {
            taskDefinitionKey: 'product-opening',
            taskName: 'Product Opening',
            departmentName: 'RM',
            customComponentName: "",
            schema: '{"title":"A registration form","description":"A simple form example.","type":"object","required":["firstName","lastName"],"properties":{"firstName":{"type":"string","title":"First name","default":"Chuck"},"lastName":{"type":"string","title":"Last name"},"age":{"type":"integer","title":"Age"},"bio":{"type":"string","title":"Bio"},"password":{"type":"string","title":"Password","minLength":3},"telephone":{"type":"string","title":"Telephone","minLength":10}}}',
            circumsance: 'OPENING',
            specificAssignee: false,
            variables: {
                accessRoleGroup: 'ADMIN, USER',
                dueDate: '3',
                embeddedComponentURL: 'requests',
                redirectURL: 'product/edit/{id}?target=blank'
            }
        }
    ],
};

const ProcessForm: any = () => {
    const { state } = useLocation();
    const [formData, setFormData] = useState<any>(state && state.formData ? state.formData : initialFormData);
    const [showProcess, setShowProcess] = useState<boolean>(true);

    const handleChange = (name: string, value: any) => {
        console.log("Handle Change " + name + " " + JSON.stringify(value))
        setFormData((prevFormData: any) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(e.target.name, e.target.value);
    }

    const handleDefault = (value: boolean) => {
        if (value) {
            setFormData(initialFormData);
        } else {
            setFormData({ ...formData, defaultValue: false })
        }
    }

    const handleOpen = () => {
        setShowProcess(!showProcess);
    }

    const handleTaskChange = (value: any) => {
        setFormData((prevFormData: any) => ({
            ...prevFormData,
            "tasks": value,
        }));

    }
    const handleSubmit = () => {
        console.log(formData); // Send the formData to your backend API here
        alert("Submitted");
    };

    return (
        <div className="form-container">
            <div className="process-list-container">
                <div className="process-container">
                    <div className="form-checkbox" onClick={() => handleOpen()}>
                        <div>{formData.name}</div>
                        <div className='view'>
                            {showProcess ? <HideSvg /> : <ViewSvg />}
                        </div>
                    </div>
                    {formData.enabled && showProcess && <div className="process">
                        <div className="process-input-container">
                            {
                                formData.defaultValue !== undefined &&
                                <div className="form-checkbox-default" onClick={() => handleDefault(!formData.defaultValue)}>
                                    <input
                                        type="checkbox"
                                        name={"defaultValue"}
                                        checked={formData.defaultValue}
                                        onChange={() => handleDefault(!formData.defaultValue)}
                                    />
                                    <label>Default Process</label>
                                </div>
                            }
                            <div className='input-label'>
                                <input
                                    className="task-input"
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInput}
                                    disabled={formData.defaultValue}
                                />
                                <label>Product Name</label>
                            </div>
                            <div className='input-label'>
                                <input
                                    className="task-input"
                                    type="text"
                                    name="processDefinitionKey"
                                    value={formData.processDefinitionKey}
                                    onChange={handleInput}
                                    disabled={formData.defaultValue}
                                />
                                <label>Process Definition Key</label>
                            </div>
                        </div>
                        <TaskListContainer
                            formData={formData}
                            handleTaskChange={(value: any) => handleTaskChange(value)}
                            disabled={formData.defaultValue}
                        />
                    </div>}
                </div>
            </div>
            <div className='submit-button' onClick={handleSubmit}>
                Submit
            </div>
        </div>
    );
}

export default ProcessForm;