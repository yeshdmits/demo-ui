import React, { useEffect, useState } from "react";
import "./ProcessOverview.css"
import { useNavigate, useLocation } from 'react-router-dom';
import StatusBar from "./StatusBar";
import { getProduct } from "../service/ApiService";


const ProcessOverview = () => {
        const { state } = useLocation();
        const [processData, setProcessData] = useState<any>({});

    const navigate = useNavigate();

    const handleTaskComplete = () => {
        if (processData.metadata.customComponentName) {
            navigate("/process/task/custom", {
                state: {
                    componentProps: JSON.parse(processData.metadata.componentProps),
                    taskId: processData.metadata.taskId,
                    taskName: processData.metadata.taskName,
                    processInstanceId: state.processInstanceId
                }
            });
        } else {
            navigate("/process/task/json", {
                state: {
                    schema: JSON.parse(processData.metadata.schema),
                    taskId: processData.metadata.taskId,
                    taskName: processData.metadata.taskName,
                    processInstanceId: state.processInstanceId
                }
            });
        }
    }

    useEffect(() => {
        const fetchDataFromApi = async () => {
          try {
            const fetchedData = await getProduct(state.processInstanceId); // Call fetchData function
            setProcessData(fetchedData);
          } catch {
            console.log("Fail")
          }
        };
    
        fetchDataFromApi();
      }, [state.processInstanceId]);

    return (
        <div className="process-overview">
            <div className="product-container">
                <div className="product-title">{processData.displayName}</div>

                {processData.metadata &&
                    <div className="product-metadata">
                        <div className="product-metadata-text">You have an open action on this product: </div>
                        <div className="product-button" onClick={handleTaskComplete}>Work on task</div>
                    </div>
                }

            </div>
            <div className="product-container">
                <div className="product-title">Activation Status</div>
                <StatusBar status={processData.processStatus}/>
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
                                <th>Updated</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {processData.taskList && processData.taskList.map((task: any, id: number) =>
                                <tr key={id} className="task-row">
                                    <td>{task.taskName}</td>
                                    <td>{task.taskStatus}</td>
                                    <td>Date/Time</td>
                                    <td><div className='button-view'>view</div></td>
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
                                <th>Updated</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {processData.documentList && processData.documentList.map((doc: any, id: number) =>
                                <tr key={id} className="documents-row">
                                    <td>{doc.documentName}</td>
                                    <td>{doc.documentStatus}</td>
                                    <td>Date/Time</td>
                                    <td><div className='button-view'>view</div></td>
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