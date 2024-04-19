import React from "react";
import { ReactComponent as StatusDone } from '../svgs/status-done.svg'
import { ReactComponent as StatusInProgress } from '../svgs/status-inprogress.svg'
import { ReactComponent as StatusRejected } from '../svgs/status-rejected.svg'

const TaskStatus = (props: any) => {
    return (
        <div className="table-status">
            {props.taskStatus === 'In progress' ? <StatusInProgress width={'20px'} /> : props.taskStatus === 'Completed' ? <StatusDone width={'20px'} /> : <StatusRejected width={'20px'} />}
            <div className="table-status-text">{props.taskStatus}</div>
        </div>
    );
}

export default TaskStatus;