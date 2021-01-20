import React, {useState, useEffect} from "react";
import Chart from "react-apexcharts";
import moment from 'moment'

const StackedColumnChart = ({ applications }) => {
  const [graphState, setGraphState] = useState(null);
  
  const getCount = (status) => {
    const temp = {};
    applications.forEach((app) => {
      const filtered = app.timeline.filter((item) => item.status === status);
      if (filtered.length > 0) {
        const d = new Date(filtered[0].time);
        const date = moment(d).format("DD/MM/yyyy");
        if (temp[date]) {
          temp[date] += 1;
        } else {
          temp[date] = 1;
        }
      }
    });
    return temp;
  };

  useEffect(() => {
    if (applications) {
    const applied = getCount("Applied");
      const accepted = getCount("Accepted");
      const rejected = getCount("Rejected");
      
      setGraphState({
        options : {
            series: [{
            name: 'ACCEPTED',
            data: Object.values(accepted)
          }, {
            name: 'REJECTED',
            data: Object.values(rejected)
          }],
            chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            toolbar: {
              show: true
            },
            zoom: {
              enabled: true
            }
          },
          responsive: [{
            breakpoint: 480,
            options: {
              legend: {
                position: 'bottom',
                offsetX: -10,
                offsetY: 0
              }
            }
          }],
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },
          xaxis: {
            categories: Object.keys(applied),
          },
          legend: {
            position: 'right',
            offsetY: 40
          },
          fill: {
            opacity: 1
          }
          },
      });
    }
  }, [applications]);

  return (
    <div style={{height: "100%", width: "100%"}}>
      {graphState && graphState.options && graphState.options.series && (
        <Chart
          options={graphState.options}
          series={graphState.options.series}
          type="bar"
        />
      )}
    </div>
  );
};

export default StackedColumnChart;
