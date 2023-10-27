import Spinner from "react-bootstrap/Spinner";
import "bootstrap/dist/css/bootstrap.css";
import "./spinner.style.scss";
function SpinnerVariant() {
  return (
    <div className="spinner">
      <Spinner animation="border" variant="primary" size="lg" />
      <Spinner animation="border" variant="secondary" size="lg" />
      <Spinner animation="border" variant="success" size="lg"/>
      <Spinner animation="border" variant="danger" size="lg"/>
      <Spinner animation="border" variant="warning" size="lg"/>
      <Spinner animation="border" variant="info" size="lg"/>
      <Spinner animation="border" variant="light" size="lg" />
      <Spinner animation="border" variant="dark" size="lg"/>
      <Spinner animation="grow" variant="primary" size="lg"/>
      <Spinner animation="grow" variant="secondary" size="lg" />
      <Spinner animation="grow" variant="success" size="lg"/>
      <Spinner animation="grow" variant="danger"  size="lg"/>
      <Spinner animation="grow" variant="warning" size="lg" />
      <Spinner animation="grow" variant="info" size="lg"/>
      <Spinner animation="grow" variant="light" size="lg" />
      <Spinner animation="grow" variant="dark" size="lg"/>
    </div>
  );
}

export default SpinnerVariant;
