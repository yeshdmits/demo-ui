import React from 'react';

const DroolsHistoryTable = () => {
    return <section id="table-container">
    <table>
      <thead>
      <tr>
        <th>User ID</th>
        <th>Modified At</th>
        <th>Filepath</th>
        <th>Drools type</th>
      </tr>
      </thead>
      <tbody id="table-body">
      </tbody>
    </table>
  </section>
}

export default DroolsHistoryTable;