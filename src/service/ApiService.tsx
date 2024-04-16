import axios from 'axios';

const createProduct = async () => {
    try {
        const response = await axios.post('http://localhost:8888/api/v1/process', {
            processDefinitionId: "daeeec7d-069d-486f-93e7-1499443e0206"
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch data');
    }
};

const getProduct = async (processId: string, processInstanceId: string) => {
    try {

        const params = processId ? 'processId=' + processId : 'processInstanceId=' + processInstanceId;
        const response = await axios.get('http://localhost:8888/api/v1/process?' + params);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch data');
    }
};

const getProductList = async () => {
    try {
        const response = await axios.get('http://localhost:8888/api/v1/process/list');
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

const getDocContent = async (documentId: string) => {
    return fetch('http://localhost:8888/api/v1/process/document?documentId='+documentId)
      .then(response => response.blob())
      .then(blob => {
        return blob;
      })
      .catch(error => console.error(error));
};

export { createProduct, getProduct, completeTask, getDocContent, getProductList };