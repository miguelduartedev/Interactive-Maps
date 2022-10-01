import "bootstrap/dist/css/bootstrap.min.css";
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

// component will be the page content of our pages
// we can wrap component with our "sections" / "layouts"
const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
};

export default MyApp;
