import "bootstrap/dist/css/bootstrap.min.css";
import Script from "next/script";
import { Provider } from "react-redux";
import "../components/atoms/Button/styles/button.styles.scss";
import "../components/atoms/Footer/styles/footer.styles.scss";
import "../components/atoms/MapLegend/styles/mapLegend.styles.scss";
import "../components/atoms/Navigation/styles/navigation.styles.scss";
import "../components/molecules/ColorLegend/styles/colorLegend.styles.scss";
import "../components/molecules/ColorPicker/styles/colorPicker.styles.scss";
import "../components/molecules/CountryProfile/styles/countryProfile.styles.scss";
import "../components/organisms/ControlPanel/styles/controlPanel.styles.scss";
import "../components/organisms/Hero/styles/hero.styles.scss";
import "../components/organisms/OptionsGrid/styles/OptionsGrid.styles.scss";
import "../components/organisms/Panel/styles/Panel.styles.scss";
import "../components/organisms/SVGMap/styles/europeMap.styles.scss";
import "../components/_common/global.styles.scss";
import { store } from "../redux/store";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=G-52R14XBQ18`}
      />

      <Script strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-52R14XBQ18', {
          page_path: window.location.pathname,
          });
        `}
      </Script>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
};

export default MyApp;
