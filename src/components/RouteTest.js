import { Link } from "react-router-dom";

const RouteTest = () => {
  return (
    <div>
      <h2>RouteTest</h2>
      <p>CSR 방식으로 페이지를 이동하기 위한 test 컴포</p>
      <Link to={"/"}>Home</Link>
      <br />
      <Link to={"/diary"}>Diary</Link>
      <br />
      <Link to={"/edit"}>Edit</Link>
      <br />
      <Link to={"/new"}>New</Link>
    </div>
  );
};

export default RouteTest;
