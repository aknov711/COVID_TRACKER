import React from 'react'
import './table.css'
function Table({countries}) {
    return (
        <div classsName="table"  style={{marginTop:'20px',height:'400px',overflow:'scroll'}}>
           {
             countries.map(({country,cases})=>(
                 <tr style={{display:'flex',justifyContent:'space-between',padding:'7px'}}>
                     <td>{country}</td>
                     <td>{cases}</td>
                 </tr>
             ))
           }
        </div>
    )
}

export default Table
