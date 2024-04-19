import React, { useEffect, useState } from "react";
// import "./ProcessOverview.css"
// import "./screen-styles.css"
import { useNavigate, useLocation } from 'react-router-dom';
import StatusBar from "./StatusBar";
import { getProduct, getDocContent } from "../service/ApiService";
import { formatDate } from "../service/Utils";
import TaskStatus from "./TaskStatus";
import DocumentStatus from "./DocumentStatus";
import { ReactComponent as GoBack } from '../svgs/go-back.svg'


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
        if (task.taskStatus === 'In progress') {
            handleTaskComplete();
            return;
        }
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
        <div>
            <div className="flex flex-col">
                <div className="flex items-center shadow-lg">
                    <div className="flex-none p-4 text-4xl rounded-full hover:bg-slate-100 hover:cursor-pointer"
                        onClick={handleClose}
                    ><GoBack /></div>
                    <div
                        className="flex-1 text-4xl hover:cursor-default text-center"
                    >{processData.displayName}</div>

                </div>

                {processData.metadata &&
                    <div className="text-center mt-4 mb-4 rounded-full text-slate-100 text-2xl hover:cursor-pointer bg-green-600 p-4" onClick={handleTaskComplete}>
                        Work on task
                    </div>
                }

            </div>
            <div className="shadow-md mb-4 w-full rounded-t-[2rem]">
                <div className="flex justify-center items-center text-2xl mt-6 rounded-t-[2rem] bg-slate-300 min-h-24">Activation Status</div>
                <StatusBar status={processData.processStatus} />
            </div>
            <div className="product-summary">
            </div>
            <div className="shadow-md mb-4 w-full rounded-t-[2rem]">
                <div className="flex justify-center items-center text-2xl mt-6 rounded-t-[2rem] bg-slate-300 min-h-20">
                    Task Overview
                </div>
                <div className="">
                    <div className="bg-gray-200 px-2 py-4">
                        <div className="grid grid-cols-4 gap-4">
                            <div className="flex items-center justify-center hover:cursor-default">
                                Task
                            </div>
                            <div className="flex items-center justify-center hover:cursor-default">
                                Resolution
                            </div>
                            <div className="flex items-center justify-center hover:cursor-default">
                                Last Action
                            </div>
                            <div className="flex items-center justify-center hover:cursor-default">
                                Updated By
                            </div>
                        </div>
                    </div>
                    <div className="">
                        {processData.taskList && processData.taskList.map((task: any, id: number) =>
                            <div key={id} onClick={() => handleViewTask(task)}
                                className="grid grid-cols-4 gap-4 border-t border-gray-300 py-2 cursor-pointer hover:bg-gray-100"
                            >
                                <div className="p-3 flex items-center justify-center">
                                    {task.taskName}
                                </div>
                                <div className="p-3 flex items-center justify-center">
                                    <TaskStatus taskStatus={task.taskStatus} />
                                </div>
                                <div className="p-3 flex items-center justify-center">
                                    {formatDate(task.modifiedAt)}
                                </div>
                                <div className="p-3 flex items-center justify-center">
                                    {task.modifiedBy}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="shadow-md mb-4 w-full rounded-t-[2rem]">
                <div className="flex justify-center items-center text-2xl mt-6 rounded-t-[2rem] bg-slate-300 min-h-20">
                    Document Overview
                </div>
                <div className="">
                    <div className="bg-gray-200 px-2 py-4">
                        <div className="grid grid-cols-4 gap-4">
                            <div className="flex items-center justify-center hover:cursor-default">
                                Document
                            </div>
                            <div className="flex items-center justify-center hover:cursor-default">
                                Status
                            </div>
                            <div className="flex items-center justify-center hover:cursor-default">
                                Last Action
                            </div>
                            <div className="flex items-center justify-center hover:cursor-default">
                                Updated By
                            </div>
                            {/* <div className="table-head"></div> */}
                        </div>
                    </div>
                    <div>
                        {processData.documentList && processData.documentList.map((doc: any, id: number) =>
                            <div key={id} onClick={() => handleViewDocument(doc)}
                            className="grid grid-cols-4 gap-4 border-t border-gray-300 py-2 cursor-pointer hover:bg-gray-100">
                                <div className="p-3 flex items-center justify-center">
                                    {doc.documentName}
                                </div>
                                <div className="p-3 flex items-center justify-center">
                                    <DocumentStatus docStatus={doc.documentStatus} />
                                </div>
                                <div className="p-3 flex items-center justify-center">
                                    {formatDate(doc.modifiedAt)}
                                </div>
                                <div className="p-3 flex items-center justify-center">
                                    {doc.modifiedBy}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProcessOverview;