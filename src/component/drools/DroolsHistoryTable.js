import React from 'react';

const DroolsHistoryTable = ({history}) => {
    return history && (
    <section>
    <table className='drools-history-table'>
      <thead>
      <tr>
        <th className='drools-history-head'>User ID</th>
        <th className='drools-history-head'>Modified At</th>
        <th className='drools-history-head'>Filepath</th>
        <th className='drools-history-head'>Drools type</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td className='drools-history-body'>User ID</td>
        <td className='drools-history-body'>Modified At</td>
        <td className='drools-history-body'>Filepath</td>
        <td className='drools-history-body'>Drools type</td>
      </tr>
      <tr>
        <td className='drools-history-body'>User ID</td>
        <td className='drools-history-body'>Modified At</td>
        <td className='drools-history-body'>Filepath</td>
        <td className='drools-history-body'>Drools type</td>
      </tr>
      </tbody>
    </table>
    </section>
)};

export default DroolsHistoryTable;