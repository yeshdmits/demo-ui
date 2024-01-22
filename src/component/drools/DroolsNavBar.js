import React from 'react';
import Button from "../Button"



const DroolsNavBar = ({setForm}) => {
  return (
    <nav>
      {/* <a id="loggedUserId"></a> */}
      <Button handleClick={() => setForm("PR_EL")}>Product Eligibility</Button>
      <Button handleClick={() => setForm("D_SA")}>Distribution Service Agreement</Button>
      <Button handleClick={() => setForm("D_SR")}>Distribution Service Role</Button>
      <Button handleClick={() => setForm("M_SA")}>Modification Service Agreement</Button>
      <Button>History</Button>
    </nav>
)};



export default DroolsNavBar;