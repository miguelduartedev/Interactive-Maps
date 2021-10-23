import "./footer.scss";

const Footer = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="footer">
            <p className="footer__text pt-5 text-center">
              <span className="footer__text--main">
                Interactive Maps developed by&nbsp;
              </span>
              <a
                className="footer__text--anchor"
                href="https://www.linkedin.com/in/lu%C3%ADs-c-619364108/"
              >
                Luís Conceição
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
