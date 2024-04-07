export interface Task {
    taskDefinitionKey: string;
    taskName: string;
    departmentName: string;
    customComponentName: string | null;
    json: string | null;
    circumsance: 'SA_MODIFICATION' | 'SA_OPENING' | 'SA_CLOSING' | 'SR_OPENING' | 'SR_MODIFICATION' | 'SR_CLOSING';
    specificAssignee: boolean;
    variables: {
        accessRoleGroup: string;
        dueDate: string;
        embeddedComponentURL: string;
        redirectURL: string;
    };
}

export interface Form {
    formNo: string;
    location: string;
    productCrmId: string;
    formCode: string;
    jsonFieldsMapping: string;
    languages: { title: string; language: string }[];
}
export interface Process {
    enabled: boolean;
    defaultValue?: boolean;
    processDefinitionKey: string;
    schema?: string; // assuming schema can be a JSON string
    tasks: Task[];
    forms?: Form[];
}
export interface FormData {
    ServiceName: string;
    ServiceId: string;
    Family: 'Investment products' | 'Banking products' | 'Service' | 'Other';
    Category: 'e-Channels / Direct Access' | 'Investment' | 'Direct Access' | 'Data Transfer' | 'Direct Transfer' | 'Other';
    Context: 'Partner' | 'Business relation' | 'Portfolio';
    ShortDescription: string;
    LongDescription: string;
    MaxNo: number;
    InitiationProcess: Process;
    ConfigurationProcess: Process;
    PreapprovalProcess: Process;
    DistributionProcess: Process;
    ValidationProcess: { enabled: boolean; defaultValue: boolean; processDefinitionKey: string; tasks: Task[] };
    SetupProcess: Process;
    ApprovalProcess: Process;
    ActivationProcess: Process;
}
