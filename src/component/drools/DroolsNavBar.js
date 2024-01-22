import React, {useEffect, useState} from 'react';
import Button from "../Button"
import {formMapping} from '../../constants'


const DroolsNavBar = ({currentFormValue, setForm, currentHistoryValue, setHistory}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  useEffect(() => {}, [isCollapsed])

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

  const handleMenuClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsCollapsed(!isCollapsed)
  }

  return (
    <div>
    <nav>
      <div>
        <Button className="button-menu" handleClick={(e) => handleMenuClick(e)}>Menu</Button>
      </div>
      <div className='nav-items'>
        <Button className="button-drools-nav" handleClick={() => handleFormClick("PR_EL")}>{formMapping.PR_EL}</Button>
        <Button className="button-drools-nav" handleClick={() => handleFormClick("D_SA")}>{formMapping.D_SA}</Button>
        <Button className="button-drools-nav" handleClick={() => handleFormClick("D_SR")}>{formMapping.D_SR}</Button>
        <Button className="button-drools-nav" handleClick={() => handleFormClick("M_SA")}>{formMapping.M_SA}</Button>
        <Button className="button-drools-nav" handleClick={() => handleHistoryClick()}>History</Button>
      </div>
    </nav>
    <div className='nav-items-collapse' 
          style={{
            display: 'flex',
            flexDirection: 'column',
            maxHeight: isCollapsed ? '0px' : '200px',
            overflow: 'hidden',
            transition: 'max-height 0.3s ease-out',
          }}>
      <Button className="button-drools-nav" handleClick={() => handleFormClick("PR_EL")}>{formMapping.PR_EL}</Button>
      <Button className="button-drools-nav" handleClick={() => handleFormClick("D_SA")}>{formMapping.D_SA}</Button>
      <Button className="button-drools-nav" handleClick={() => handleFormClick("D_SR")}>{formMapping.D_SR}</Button>
      <Button className="button-drools-nav" handleClick={() => handleFormClick("M_SA")}>{formMapping.M_SA}</Button>
      <Button className="button-drools-nav" handleClick={() => handleHistoryClick()}>History</Button>
    </div>
    </div>
)};



export default DroolsNavBar;