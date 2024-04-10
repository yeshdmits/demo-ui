import React, { useEffect, useState } from 'react';
import { ReactComponent as ViewSvg } from '../svgs/open.svg';
import { ReactComponent as PlusSvg } from '../svgs/plus.svg';
import { ReactComponent as HideSvg } from '../svgs/close.svg';
import { ReactComponent as DeleteSvg } from '../svgs/delete.svg';
import DisplayJsonFormDialog from './form/DisplayJsonFormDialog';

const TaskListContainer = (props: any) => {
    const { handleTaskChange, tasks, disabled } = props;
    const [showTasks, setShowTasks] = useState<boolean>(false)
    const [taskId, setTaskId] = useState<number>(0)
    const [taskView, setTaskView] = useState<any>(tasks[0])
    const [isJsonFormOpen, setIsJsonFormOpen] = useState<boolean>(false);

    const addTask = () => {
        if (disabled) {
            return;
        }
        let newArr = [...tasks];
        newArr[newArr.length] = { ...newArr[0] };
        setTaskView(newArr[newArr.length - 1])
        setTaskId(newArr.length - 1)
        handleTaskChange(newArr);

    }

    const handleViewTask = (id: number, value: any) => {
        if (taskId === id) {
            setTaskId(-1);
            setTaskView(null);
        } else {
            setTaskId(id);
            setTaskView(value);
        }
    }

    const handleRemoveTask = (id: number) => {
        if (disabled) {
            return;
        }
        let newArr = [...tasks];
        if (newArr.length === 1) {
            return;
        }
        newArr.splice(id, 1)
        handleTaskChange(newArr);
        setTaskView(newArr[id - 1])
        setTaskId(id - 1)
    }

    const handleTask = (id: number, value: any) => {
        let newArr = [...tasks]
        newArr[id] = value;
        handleTaskChange(newArr);
    }

    const handleInput = (e: any) => {
        handleChange(e.target.name, e.target.value);
    }
    const handleVariableInput = (e: any) => {
        handleChange("variables", { ...taskView.variables, [e.target.name]: e.target.value });
    }

    const handleChange = (key: string, value: any) => {
        setTaskView({ ...taskView, [key]: value })
        handleTask(taskId, { ...taskView, [key]: value })
    }
    const handleShowTasks = () => {
        setShowTasks(!showTasks);
        setTaskId(-1);
        setTaskView(null);
    }

    const handleJsonFormDialog = () => {
        if (disabled) return;
        setIsJsonFormOpen((oldValue: any) => !oldValue);
    }
    const handleSchemaChange = (value: any) => {
        setTaskView({ ...taskView, "schema": value })
        handleTask(taskId, { ...taskView, "schema": value })
    }
    useEffect(() => { }, [taskId, taskView]);


    return (
        <div className='accordion'>
            <div className={showTasks ? "task-acc-opened" : "task-acc"} onClick={() => handleShowTasks()}>
                <div className='view'>
                    {showTasks ? <HideSvg /> : <ViewSvg />}
                </div>
                <div className="view-task" >
                    {"Tasks"}
                </div>
            </div>
            <div className={`task-list ${showTasks ? 'open' : ''}`}>
                <div className='task-list-name'>
                    {tasks.length !== 0 && showTasks &&
                        <div className='scrollable'>
                            {showTasks && tasks.map((value: any, id: number) =>
                                <div key={id} className='task-full'>
                                    <div className={taskId === id ? 'task-name-pushed' : 'task-name'} onClick={() => handleViewTask(id, value)}>
                                        <div className='task-name-label' >
                                            {value.taskName ? value.taskName : "new task"}
                                        </div>
                                        <div className='delete' onClick={() => handleRemoveTask(id)}><DeleteSvg /></div>
                                    </div>
                                    {showTasks && taskId === id &&
                                        <div className='task-container'>
                                            <div className='input-label'>
                                                <input
                                                    disabled={disabled}
                                                    maxLength={50}
                                                    className="task-input"
                                                    type="text"
                                                    name="taskDefinitionKey"
                                                    value={taskView.taskDefinitionKey}
                                                    onChange={handleInput}
                                                />
                                                <label>Task Definition Key</label>
                                            </div>
                                            <div className='input-label'>
                                                <input
                                                    disabled={disabled}
                                                    maxLength={50}
                                                    className="task-input"
                                                    type="text"
                                                    name="taskName"
                                                    value={taskView.taskName}
                                                    onChange={handleInput}
                                                />
                                                <label>Task Name</label>
                                            </div>
                                            <div className='input-label'>
                                                <input
                                                    disabled={disabled}
                                                    maxLength={50}
                                                    className="task-input"
                                                    type="text"
                                                    name="departmentName"
                                                    value={taskView.departmentName}
                                                    onChange={handleInput}
                                                />
                                                <label>Department Name</label>
                                            </div>
                                            <div className="task-input" onClick={() => handleChange("specificAssignee", !taskView.specificAssignee)}>
                                                <input
                                                    type="checkbox"
                                                    checked={taskView.specificAssignee}
                                                    disabled={disabled}
                                                    onChange={() => handleChange("specificAssignee", !taskView.specificAssignee)}
                                                />
                                                <label htmlFor={props.id}>Specific Assignee</label>
                                            </div>
                                            <div className='input-label'>
                                                <input
                                                    disabled={disabled}
                                                    maxLength={50}
                                                    className="task-input"
                                                    type="text"
                                                    name="customComponentName"
                                                    value={taskView.customComponentName}
                                                    onChange={handleInput}
                                                />
                                                <label>Custom Component Name</label>
                                            </div>
                                            <div className='schema-input'>
                                                <div className={disabled ? "open-dialog-disabled":"open-dialog"} onClick={handleJsonFormDialog}>Test Form</div>
                                                <div className='input-label'>
                                                    <input
                                                        disabled={true}
                                                        maxLength={50}
                                                        className="task-input"
                                                        type="text"
                                                        name="json"
                                                        value={taskView.schema}
                                                        onChange={handleInput}
                                                    />
                                                    <label>JSON Schema</label>
                                                </div>
                                            </div>

                                            <div className='variables'>
                                                <h4>Variables</h4>
                                                <div className='variables-list'>
                                                    <div className='input-label'>
                                                        <input disabled={disabled}
                                                            maxLength={50}
                                                            className="task-input"
                                                            type="text"
                                                            name="accessRoleGroup"
                                                            value={taskView.variables.accessRoleGroup}
                                                            onChange={handleVariableInput}
                                                        />
                                                        <label>Access Role Group</label>
                                                    </div>
                                                    <div className='input-label'>
                                                        <input
                                                            disabled={disabled}
                                                            maxLength={50}
                                                            className="task-input"
                                                            type="text"
                                                            name="dueDate"
                                                            value={taskView.variables.dueDate}
                                                            onChange={handleVariableInput}
                                                        />
                                                        <label>Due Date</label>
                                                    </div>
                                                    <div className='input-label'>
                                                        <input
                                                            disabled={disabled}
                                                            maxLength={50}
                                                            className="task-input"
                                                            type="text"
                                                            name="embeddedComponentURL"
                                                            value={taskView.variables.embeddedComponentURL}
                                                            onChange={handleVariableInput}
                                                        />
                                                        <label>Component URL</label>
                                                    </div>
                                                    <div className='input-label'>
                                                        <input
                                                            disabled={disabled}
                                                            maxLength={50}
                                                            className="task-input"
                                                            type="text"
                                                            name="redirectURL"
                                                            value={taskView.variables.redirectURL}
                                                            onChange={handleVariableInput}
                                                        />
                                                        <label>Redirect URL</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                </div>)
                            }
                        </div>}
                    {showTasks &&
                        <div className='add-task'
                            onClick={() => addTask()}>
                            <PlusSvg className='add-task-button' />
                        </div>}

                </div>
            </div>
            {taskView &&
                <DisplayJsonFormDialog
                    isOpen={isJsonFormOpen}
                    onClose={handleJsonFormDialog}
                    schema={JSON.parse(taskView.schema)}
                    handleSchemaChange={(value: any) => handleSchemaChange(value)} />}
        </div>
    );
}

export default TaskListContainer;