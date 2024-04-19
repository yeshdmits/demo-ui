import React from "react";
import { ReactComponent as StatusDone } from '../svgs/status-done.svg'
import { ReactComponent as StatusInProgress } from '../svgs/status-inprogress.svg'
import { ReactComponent as StatusRejected } from '../svgs/status-rejected.svg'

const DocumentStatus = (props: any) => {
    return (
        <div className="table-status">
            {props.docStatus === 'Created' ? <StatusInProgress width={'20px'} /> : props.docStatus === 'Completed' ? <StatusDone width={'20px'} /> : props.docStatus === 'Sent' ?  <StatusInProgress width={'20px'} />:<StatusRejected width={'20px'} />}
            <div className="table-status-text">{props.docStatus}</div>
        </div>
    );
}

export default DocumentStatus;