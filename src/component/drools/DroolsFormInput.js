import React from 'react';
import Loader from '../Loader';

const formMapping = Object.freeze({
  PR_EL: 'Product Eligibility',
  D_SA: 'Distribution Service Agreement',
  D_SR: 'Distribution Service Role',
  M_SA:  'Modification Service Agreement'
});
const DroolsFormInput = ({name}) => {
  return name && (
    <section id="form">
    <h1 id="formName">{formMapping[name]}</h1>
    <form>
      <div>
        <input id="selectedFile" type="file" accept=".xlsx, .xls" required/>
      </div>
      <div className="row">
        <div className="col">
          <button id="button-refresh" type="button">Upload</button>
        </div>
        <div className="col">
          <button id="button-download" type="button" >Download</button>
        </div>
        <div className="col">
          <button id="button-restore" type="button">Reset</button>
        </div>
      </div>
    </form>
    <Loader/>
    <div id="success-message"></div>
    <div id="error-message"></div>
  </section>
)};

export default DroolsFormInput;