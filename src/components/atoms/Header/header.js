import { Link } from "react-router-dom";
import "./styles/header.scss";

const Header = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Link to="/Interactive-Maps">
            <img
              className="logo"
              src="https://raw.githubusercontent.com/luisconceicaodev/Interactive-Maps/master/public/logo.svg"
              alt="Interactive Maps logo"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
