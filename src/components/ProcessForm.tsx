import React, { useEffect, useState } from 'react';
import TaskListContainer from './TaskListContainer';
import { ReactComponent as ViewSvg } from '../svgs/open-process.svg';
import { ReactComponent as HideSvg } from '../svgs/close.svg';

const ProcessForm: any = (props: any) => {
    const [process, setProcess] = useState<any>(props.process)
    const [showProcess, setShowProcess] = useState<boolean>(true)

    const { name, updateForm, handleDefault } = props;

    const handleInput = (e: any) => {
        handleChange(e.target.name, e.target.value);
    }

    const handleChange = (key: string, value: any) => {
        setProcess({ ...process, [key]: value });
    }

    const defaultClick = (value: boolean) => {
        setProcess({ ...process, ["defaultValue"]: value });
        handleDefault();
    }

    const handleOpen = () => {
        setShowProcess(!showProcess);
    }

    const handleTaskChange = (value: any) => {
        setProcess({ ...process, "tasks": value })
    }

    useEffect(() => {
        updateForm(name, process);
    }, [process])

    return (
        <div className="process-container">
            <div className="form-checkbox" onClick={() => handleOpen()}>
                <div>{process.name}</div>
                <div className='view'>
                    {showProcess ? <HideSvg /> : <ViewSvg />}
                </div>
            </div>
            {process.enabled && showProcess && <div className="process">
                <div className="process-input-container">
                    {
                        process.defaultValue !== undefined &&
                        <div className="form-checkbox-default" onClick={() => defaultClick(!process["defaultValue"])}>
                            <input
                                type="checkbox"
                                id={props.id}
                                name={"defaultValue"}
                                checked={process.defaultValue}
                                onChange={() => defaultClick(!process["defaultValue"])}
                            />
                            <label htmlFor={name}>Default Process</label>
                        </div>
                    }
                    <div className='input-label'>
                        <input
                            className="task-input"
                            type="text"
                            name="name"
                            value={process.name}
                            onChange={handleInput}
                            disabled={process.defaultValue}
                        />
                        <label>Product Name</label>
                    </div>
                    <div className='input-label'>
                        <input
                            className="task-input"
                            type="text"
                            name="processDefinitionKey"
                            value={process.processDefinitionKey}
                            onChange={handleInput}
                            disabled={process.defaultValue}
                        />
                        <label>Process Definition Key</label>
                    </div>
                    <div className='input-label'>
                        <input
                            className="task-input"
                            type="text"
                            name="schema"
                            value={process.schema}
                            onChange={handleInput}
                            disabled={process.defaultValue}
                        />
                        <label>JSON Schema</label>
                    </div>


                </div>

                <TaskListContainer
                    process={process}
                    handleTaskChange={(value: any) => handleTaskChange(value)}
                />
            </div>}
        </div>
    );
}

export default ProcessForm;