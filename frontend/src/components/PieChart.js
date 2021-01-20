import React from "react";
import Chart from "react-apexcharts";

const PieChart = ({ graphState }) => {
  return (
    <div style={{height: "100%", width: "100%"}}>
      {graphState && graphState.options && graphState.options.series && (
        <Chart
          options={graphState.options}
          series={graphState.options.series}
          type="pie"
        />
      )}
    </div>
  );
};

export default PieChart;
