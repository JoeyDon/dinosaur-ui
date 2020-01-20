import React from "react";
import "./ResultTable.scss";

export default function Table(props) {
  const { report } = props.reportData;

  return (
    <div>
      <h1>Here's the result:</h1>
      <div>
        <p> Number of eggs: {report.number_of_eggs}</p>
        <p> Sequence: {report.rotation_amount}</p>
        <p> Sequence: {report.sequence}</p>
      </div>

      <div>
        <table className="table-result">
          <tbody>
            <tr>
              <th>Egg No.</th>
              <th>Egg Rotation Percent</th>
            </tr>
            {report.rotations.map(dataRow => {
              return (
                <tr key={dataRow.egg}>
                  <td>{dataRow.egg}</td>
                  <td>{dataRow.was_rotated * 100}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
