import React, { useEffect, useState } from 'react';
import ProcessForm from './ProcessForm';
import './construct.css';

const initialFormData = {
    product: {
        name: "Process",
        enabled: true,
        defaultValue: true,
        processDefinitionKey: 'defaultProductOpening',
        tasks: [
            {
                taskDefinitionKey: 'product-opening',
                taskName: 'Product Opening',
                departmentName: 'RM',
                customComponentName: "",
                json: "",
                circumsance: 'OPENING',
                specificAssignee: false,
                variables: {
                    accessRoleGroup: 'ADMIN, USER',
                    dueDate: '3',
                    embeddedComponentURL: 'requests',
                    redirectURL: 'product/edit/{id}?target=blank'
                }
            }
        ],
    },
};
const ConstructForm: any = () => {
    const [formData, setFormData] = useState<any>(initialFormData);

    useEffect(() => {
    }, [formData]);

    const handleChange = (name: string, value: any) => {
        if (name === "MaxNo") {
            let variable = value === "-2" ? -1 : value;
            setFormData({ ...formData, [name]: variable });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = () => {
        console.log(formData); // Send the formData to your backend API here
    };
    const handleDefault = () => {
        setFormData(initialFormData);
    }
    return (
        <form className="form-container">
            <div className="process-list-container">
                <ProcessForm
                    name="product" 
                    process={formData.product}
                    updateForm={(name: string, value: any) => handleChange(name, value)}
                    handleDefault={() => handleDefault()}
                    disabled={formData.product.defaultValue}
                />
            </div>
            <div className='submit-button' onClick={() => handleSubmit()}>
                Submit
            </div>
        </form>
    );
};

export default ConstructForm;
