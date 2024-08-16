import React from 'react'
import '../../App.css'
function ComplaintsDataDisplayTable({data}) {

    return (
        <table>
          <thead>
            <tr>
              <th className='field-name-th'>Field Name</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
          
            {Object.entries(data).map(([key, value]) => (
              <tr key={key}>
                <td>{key}</td>
                <td>
                  {typeof value === 'object' ? (
                    <pre>{JSON.stringify(value, null, 2)}</pre>
                  ) : (
                    value
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
}

export default ComplaintsDataDisplayTable