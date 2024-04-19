import React, { useEffect, useState } from "react";
import "./ProcessOverview.css"
import "./screen-styles.css"
import { useNavigate, useLocation } from 'react-router-dom';
import StatusBar from "./StatusBar";
import { getProduct, getDocContent } from "../service/ApiService";
import { formatDate } from "../service/Utils";
import TaskStatus from "./TaskStatus";
import DocumentStatus from "./DocumentStatus";


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
            const fetchedData = await getProduct(state.processId, state.processInstanceId);
            setProcessData(fetchedData);
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
                <table className="product-table">
                    <thead>
                        <tr className="table-row">
                            <th className="table-head">Task</th>
                            <th className="table-head">Resolution</th>
                            <th className="table-head">Last Action</th>
                            <th className="table-head">Updated By</th>
                            <th className="table-head"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {processData.taskList && processData.taskList.map((task: any, id: number) =>
                            <tr key={id} className="table-row">
                                <td className="table-cell">{task.taskName}</td>
                                <td className="table-cell">
                                    <TaskStatus taskStatus={task.taskStatus} />
                                </td>


                                <td className="table-cell">{formatDate(task.modifiedAt)}</td>
                                <td className="table-cell">{task.modifiedBy}</td>
                                <td className="table-cell">{task.taskStatus !== 'In progress' && <div className='button-view' onClick={() => handleViewTask(task)}>view</div>}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <div className="product-container">
                <div className="product-title">Documents</div>
                <table className="product-table">
                    <thead>
                        <tr className="table-row">
                            <th className="table-head">Document</th>
                            <th className="table-head">Status</th>
                            <th className="table-head">Last Action</th>
                            <th className="table-head">Updated By</th>
                            <th className="table-head"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {processData.documentList && processData.documentList.map((doc: any, id: number) =>
                            <tr key={id} className="table-row">
                                <td className="table-cell">{doc.documentName}</td>
                                <td className="table-cell">
                                    <DocumentStatus docStatus={doc.documentStatus} />
                                </td>
                                <td className="table-cell">{formatDate(doc.modifiedAt)}</td>
                                <td className="table-cell">{doc.modifiedBy}</td>
                                <td className="table-cell"><div className='button-view' onClick={() => handleViewDocument(doc)}>view</div></td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ProcessOverview;