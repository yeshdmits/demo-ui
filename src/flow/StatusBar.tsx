import React from "react";
import { ReactComponent as StatusDone } from '../svgs/status-done.svg'
import { ReactComponent as StatusInProgress } from '../svgs/status-inprogress.svg'
import { ReactComponent as StatusPending } from '../svgs/status-pending.svg'
const StatusBar = (props: any) => {
    return (
        <div className="product-statusbar-container">
            {/* <div className={`status-item ${processData.processStatus === 'Created' ? 'active' : ''}`}>Created</div> */}
            <div className="product-status">
                {props.status === 'Created' ? <StatusInProgress /> : <StatusDone />}
                <div className={`status-item ${props.status === 'Created' ? 'active' : 'done'}`}>Created</div>
            </div>
            <div className="product-status">
                {props.status === 'In Progress' ? <StatusInProgress /> : props.status === 'Created' ? <StatusPending /> : <StatusDone />}
                <div className={`status-item ${props.status === 'In Progress' ? 'active' : props.status === 'Created' ? 'pending' : 'done'}`}>In Progress</div>
            </div>
            <div className="product-status">
                {props.status === 'Active' ? <StatusInProgress /> : <StatusPending />}
                <div className={`status-item ${props.status === 'Active' ? 'active' : 'pending'}`}>Active</div>
            </div>
        </div>
    );
}

export default StatusBar;