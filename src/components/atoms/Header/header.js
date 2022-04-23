import "./styles/header.scss";

const Header = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <a href="/">
            <img
              className="logo"
              src="https://raw.githubusercontent.com/luisconceicaodev/Interactive-Maps/master/public/logo.svg"
              alt="Interactive Maps logo"
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Header;
