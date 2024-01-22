import React from 'react';
import Button from "../Button"
import {formMapping} from '../../constants'


const DroolsNavBar = ({currentFormValue, setForm, currentHistoryValue, setHistory}) => {
  const handleFormClick = (name) => {
    setHistory(false)
    if (currentFormValue === name) {
      setForm(null);
    } else {
      setForm(name)
    }
  }
  const handleHistoryClick = () => {
      setForm(null);
      setHistory(!currentHistoryValue);
  }

  return (
    <nav>
      <Button className="button-drools-nav" handleClick={() => handleFormClick("PR_EL")}>{formMapping.PR_EL}</Button>
      <Button className="button-drools-nav" handleClick={() => handleFormClick("D_SA")}>{formMapping.D_SA}</Button>
      <Button className="button-drools-nav" handleClick={() => handleFormClick("D_SR")}>{formMapping.D_SR}</Button>
      <Button className="button-drools-nav" handleClick={() => handleFormClick("M_SA")}>{formMapping.M_SA}</Button>
      <Button className="button-drools-nav" handleClick={() => handleHistoryClick()}>History</Button>
    </nav>
)};



export default DroolsNavBar;