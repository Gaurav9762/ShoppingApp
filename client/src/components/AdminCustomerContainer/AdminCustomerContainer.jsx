// import logo from "./logo.svg";
import AdminContainer from "../Admin/AdminContainer";
// import CustomerContainer from "../CustomerContainer/CustomerContainer";

function AdminCustomerContainer(props) {
  return (
    <>
      <AdminContainer {...props} />

      {/* {" "}
      {props?.isAdmin ? (
        <AdminContainer {...props} />
      ) : (
        <CustomerContainer {...props} />
      )} */}
    </>
  );
}

export default AdminCustomerContainer;
