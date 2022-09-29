import Link from "next/link";

const Header = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <Link href="/">
            <img
              className="logo"
              src="https://raw.githubusercontent.com/luisconceicaodev/Interactive-Maps/master/public/logo.svg"
              width="400"
              height="100"
              alt="Interactive Maps logo"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
