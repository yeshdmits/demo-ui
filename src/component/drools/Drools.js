import React, { useState, useEffect } from 'react';
import DroolsNavBar from './DroolsNavBar';
import DroolsFormInput from './DroolsFormInput';
import DroolsHistoryTable from './DroolsHistoryTable';


const Drools = () => {
  const [formName, setFormName] = useState(null);
  const [history, setHistory] = useState(false);
  useEffect(() => {}, [formName]);

  return (
  <div id='drools-div'>
    <DroolsNavBar setForm={setFormName} setHistory={setHistory} currentFormValue={formName} currentHistoryValue={history}/>
    <DroolsFormInput name={formName} history={history}/>
    <DroolsHistoryTable history={history}/>
  </div>
)};

export default Drools;
