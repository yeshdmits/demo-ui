import axios from 'axios';
import { getToken, fetchToken } from './AuthService';
import { CustomError } from '../components/login/ErrorComponent';


const createProduct = async () => {
    const headers: any = {
        'Authorization': 'Bearer ' + getToken()
    };
    return axios.post('http://localhost:8080/api/v1/process',
        { processDefinitionId: "b7af9735-dd0a-42dc-8e7b-4812c71b69c4" },
        { headers }
    ).then(response => {
        return response.data
    }).catch(error => {
        // throw new CustomError(error.message, error.status);
    });
};

const getProduct = async (processId: string, processInstanceId: string) => {
    const headers: any = {
        'Authorization': 'Bearer ' + getToken()
    };
    const params = processId ? 'processId=' + processId : 'processInstanceId=' + processInstanceId;
    return axios.get('http://localhost:8080/api/v1/process?' + params,
        { headers }
    ).then(response => {
        return response.data
    }).catch(error => {
        // throw new CustomError(error.message, error.status);
    });
};

const getProductList = async () => {
    const headers: any = {
        'Authorization': 'Bearer ' + getToken()
    };
    return axios.get('http://localhost:8080/api/v1/process/list',
        { headers }
    ).then(response => {
        return response.data
    }).catch(error => {
        // throw new CustomError(error.message, error.status);
    });
};


const completeTask = async (taskFormData: any) => {
    const headers: any = {
        'Authorization': 'Bearer ' + getToken()
    };
    return axios.put('http://localhost:8080/api/v1/process',
        taskFormData, { headers }
    ).then(response => {
        return response.data
    }).catch(error => {
        // throw new CustomError(error.message, error.status);
    });
};

const getDocContent = async (documentId: string) => {
    const headers: any = {
        'Authorization': 'Bearer ' + getToken()
    };
    return fetch('http://localhost:8080/api/v1/process/document?documentId=' + documentId,
        { headers }
    )
        .then(response => response.blob())
        .then(blob => {
            return blob;
        }).catch(error => {
            // throw new CustomError(error.message, error.status);
        });
};

const requestLogin = (username: string, password: string) => {
    return fetchToken(username, password);
}

export { createProduct, getProduct, completeTask, getDocContent, getProductList, requestLogin };