import React from "react";
import Chart from "react-apexcharts";

const LineGraph = ({ graphState }) => {
  return (
    <div>
      {graphState && graphState.options && graphState.series && (
        <Chart
          options={graphState.options}
          series={graphState.series}
          type="area"
          height={350}
          style={{ width: "97vw" }}
        />
      )}
    </div>
  );
};

export default LineGraph;
