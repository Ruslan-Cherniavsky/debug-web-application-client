
import DataTable from "../components/TableComp";
import TableControlForm from "../components/TableControllFormComp";

const DataStreemingPage = () => {
  return (<>
    <h3 className="pageName">Data Streeming </h3>
    <div className="container">
      <div className="row">
        <TableControlForm />
        <DataTable />
      </div>
    </div>
  </>
  );
};

export default DataStreemingPage;
