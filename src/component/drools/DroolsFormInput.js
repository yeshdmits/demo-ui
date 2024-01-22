import React, { useEffect, useState } from 'react';
import Loader from '../Loader';
import Button from '../Button';
import {formMapping} from '../../constants'

import { uploadDrools } from '../../service/ApiService';

const handleUpload = async (event, setLoading, setSuccess, setMessage, setError) => {
  setLoading(true)
  let response = await uploadDrools(event.target.files[0])
  if (response.code === 200) {
    setSuccess(true)
  } else {
    setError(true)
  }
  setLoading(false)
  setMessage(response.message);
  event.target.value = null;
}


const DroolsFormInput = ({name}) => {
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setError] = useState(false);
  useEffect(() => {}, [name]);


  return name && (
    <section className='drools-form-section'>
    <h1>{formMapping[name]}</h1>
    <form>
      <div className="drools-input-div">
        <label htmlFor="fileInput">
            Upload a .xlsx file:
        </label>
        <input id="fileInput" type="file" accept=".xlsx, .xls" required onChange={e => handleUpload(e, setLoading, setSuccess, setMessage, setError)}/>
      </div>
      <div className='drools-action-buttons'>
        {/* <Button className="button-upload" type="button" onClick={() => handleUpload(file, setLoading)}>Upload</Button> */}
        <Button className="button-download" type="button" >Download</Button>
        <Button className="button-restore" type="button">Reset</Button>
      </div>
    </form>
    <Loader enabled={isLoading}/>
    {isSuccess && <div className="success-message">{message}</div>}
    {isError && <div className="error-message">{message}</div>}
  </section>
)};

export default DroolsFormInput;