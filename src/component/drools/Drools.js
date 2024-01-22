import React, { useState } from 'react';
import "../../css/Drools.css"
import DroolsNavBar from './DroolsNavBar';
import DroolsFormInput from './DroolsFormInput';
import DroolsHistoryTable from './DroolsHistoryTable';


const Drools = () => {
  const [formName, setFormName] = useState(null);


  return (
  <div id='drools-div'>
    <DroolsNavBar setForm={setFormName}/>
    <DroolsFormInput name={formName}/>
    <DroolsHistoryTable />
  </div>
)};

export default Drools;
