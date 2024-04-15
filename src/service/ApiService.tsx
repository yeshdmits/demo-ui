import axios from 'axios';

const createProduct = async () => {
    try {
        const response = await axios.post('http://localhost:8888/api/v1/process', {
            processDefinitionId: "9746028a-cf72-4265-93be-d10d82039972"
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch data');
    }
};

const getProduct = async (processInstanceId: string) => {
    try {
        const response = await axios.get('http://localhost:8888/api/v1/process?processInstanceId=' + processInstanceId);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch data');
    }
};

const completeTask = async (taskFormData: any) => {
    try {
        const response = await axios.put('http://localhost:8888/api/v1/process',
            taskFormData
        );
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch data');
    }
};

export { createProduct, getProduct, completeTask };