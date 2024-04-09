import React, { useState } from 'react';
import TaskListContainer from './TaskListContainer';
import { ReactComponent as ViewSvg } from '../svgs/open-process.svg';
import { ReactComponent as HideSvg } from '../svgs/close.svg';
import './screen-styles.css';
import './display-styles.css';

const initialFormData = {
    name: "Process",
    enabled: true,
    defaultValue: true,
    processDefinitionKey: 'defaultProductOpening',
    schema: "",
    tasks: [
        {
            taskDefinitionKey: 'product-opening',
            taskName: 'Product Opening',
            departmentName: 'RM',
            customComponentName: "",
            json: "",
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
    const [formData, setFormData] = useState<any>(initialFormData);
    const [showProcess, setShowProcess] = useState<boolean>(true)

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
        <form className="form-container">
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
                            <div className='input-label'>
                                <input
                                    className="task-input"
                                    type="text"
                                    name="schema"
                                    value={formData.schema}
                                    onChange={handleInput}
                                    disabled={formData.defaultValue}
                                />
                                <label>JSON Schema</label>
                            </div>


                        </div>

                        <TaskListContainer
                            process={formData}
                            tasks={formData.tasks}
                            handleTaskChange={(value: any) => handleTaskChange(value)}
                            disabled={formData.defaultValue}
                        />
                    </div>}
                </div>
            </div>
            <div className='submit-button' onClick={handleSubmit}>
                Submit
            </div>
        </form>
    );
}

export default ProcessForm;