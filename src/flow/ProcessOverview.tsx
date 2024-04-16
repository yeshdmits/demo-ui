import React, { useEffect, useState } from "react";
import "./ProcessOverview.css"
import "./screen-styles.css"
import { useNavigate, useLocation } from 'react-router-dom';
import StatusBar from "./StatusBar";
import { getProduct, getDocContent } from "../service/ApiService";
import { formatDate } from "../service/Utils";
import { ReactComponent as StatusDone } from '../svgs/status-done.svg'
import { ReactComponent as StatusInProgress } from '../svgs/status-inprogress.svg'

const ProcessOverview = () => {
    const { state } = useLocation();
    const [processData, setProcessData] = useState<any>({});

    const navigate = useNavigate();

    const handleTaskComplete = () => {
        if (processData.metadata.customComponentName) {
            console.log(state.processId);
            navigate("/process/task/custom", {
                state: {
                    componentProps: JSON.parse(processData.metadata.componentProps),
                    taskId: processData.metadata.taskId,
                    taskName: processData.metadata.taskName,
                    processId: processData.processEntityId
                }
            });
        } else {
            navigate("/process/task/json", {
                state: {
                    schema: JSON.parse(processData.metadata.schema),
                    taskId: processData.metadata.taskId,
                    taskName: processData.metadata.taskName,
                    processId: processData.processEntityId,
                    readOnly: false,
                    taskFormData: {}
                }
            });
        }
    }
    const handleViewDocument = (doc: any) => {
        getDocContent(doc.documentId)
            .then((response: any) => {
                window.URL.createObjectURL(response);
                const blobUrl = window.URL.createObjectURL(response);
                // Create a link element
                const link = document.createElement('a');
                link.href = blobUrl;
                link.download = doc.documentName; // Change the filename as needed
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(blobUrl);
            })
    }
    const handleViewTask = (task: any) => {
        console.log(task)
        if (task.customTaskName) {
            navigate("/process/task/custom", {
                state: {
                    componentProps: processData.documentList,
                    taskId: task.taskId,
                    taskName: task.taskName,
                    processId: processData.processEntityId
                }
            });
        } else {
            navigate("/process/task/json", {
                state: {
                    schema: JSON.parse(task.schema),
                    taskId: task.taskId,
                    taskName: task.taskName,
                    processId: processData.processEntityId,
                    taskFormData: JSON.parse(task.content),
                    readOnly: true,
                }
            });
        }
    }

    const handleClose = () => {
        navigate("/process/list");
    }

    useEffect(() => {
        const fetchDataFromApi = async () => {
            try {
                const fetchedData = await getProduct(state.processId, state.processInstanceId); // Call fetchData function
                setProcessData(fetchedData);
            } catch {
                console.log("Fail")
            }
        };

        fetchDataFromApi();
    }, [state.processId, state.processInstanceId]);

    return (
        <div className="process-overview">
            <div className="product-container">
                <div className="product-container-header">
                    <div className="product-title">{processData.displayName}</div>
                    <div className="product-title" onClick={handleClose}>X</div>
                </div>

                {processData.metadata &&
                    <div className="product-metadata">
                        <div className="product-metadata-text">You have an open task: </div>
                        <div className="product-button" onClick={handleTaskComplete}>Work on task</div>
                    </div>
                }

            </div>
            <div className="product-container">
                <div className="product-title">Activation Status</div>
                <StatusBar status={processData.processStatus} />
            </div>
            <div className="product-summary">
            </div>
            <div className="product-container">
                <div className="product-title">Task Overview</div>
                <div className="product-table">
                    <table className="product-tasks-list">
                        <thead>
                            <tr className="task-row">
                                <th>Task</th>
                                <th>Resolution</th>
                                <th>Last Action</th>
                                <th>Updated By</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {processData.taskList && processData.taskList.map((task: any, id: number) =>
                                <tr key={id} className="task-row">
                                    <td>{task.taskName}</td>
                                    <td>
                                        <div className="table-status">
                                            {task.taskStatus === 'In progress' ? <StatusInProgress width={'20px'} /> : <StatusDone width={'20px'} />}
                                            <div className="table-status-text">{task.taskStatus}</div>
                                        </div>
                                    </td>
                                    <td>{formatDate(task.modifiedAt)}</td>
                                    <td>{task.modifiedBy}</td>
                                    <td>{task.taskStatus !== 'In progress' && <div className='button-view' onClick={() => handleViewTask(task)}>view</div>}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="product-container">
                <div className="product-title">Documents</div>
                <div className="product-table">
                    <table className="product-documents-list">
                        <thead>
                            <tr className="documents-row">
                                <th>Document</th>
                                <th>Status</th>
                                <th>Last Action</th>
                                <th>Updated By</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {processData.documentList && processData.documentList.map((doc: any, id: number) =>
                                <tr key={id} className="documents-row">
                                    <td>{doc.documentName}</td>
                                    <td>{doc.documentStatus}</td>
                                    <td>{formatDate(doc.modifiedAt)}</td>
                                    <td>{doc.modifiedBy}</td>
                                    <td><div className='button-view' onClick={() => handleViewDocument(doc)}>view</div></td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ProcessOverview;