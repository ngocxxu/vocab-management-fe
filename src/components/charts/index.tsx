import SimpleBarChart from "./SimpleBarChart";
import "./style.scss";

const ChartTable = () => {
  return (
    <div className="m-20">
      <div className="chart-table-title flex justify-between">
        <p className="text-sm">Quick Summary</p>
      </div>
      <SimpleBarChart />
    </div>
  );
};

export default ChartTable;
