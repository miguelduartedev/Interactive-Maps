import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { updateCurrentMap } from '../../../redux/mapSlice';

const OptionsGrid = () => {
  const dispatch = useDispatch();
  return (
    <div className="options-grid row">
      <div className="text-container d-flex flex-column justify-content-center align-items-center">
        <h2>Available Maps</h2>
      </div>
      <div className="col-12 col-md-4 align-self-center">
        <Link href="/world">
          <div
            className="group container d-flex flex-column justify-content-center align-items-center"
            onClick={() => dispatch(updateCurrentMap('world'))}
          >
            <div className="group-map world"></div>
            <h2 className="group-title">World</h2>
          </div>
        </Link>
      </div>
      <div className="col-12 col-md-4 align-self-center">
        <Link href="/europe">
          <div
            className="group container d-flex flex-column justify-content-center align-items-center"
            onClick={() => dispatch(updateCurrentMap('europe'))}
          >
            <div className="group-map europe"></div>
            <h2 className="group-title">Europe</h2>
          </div>
        </Link>
      </div>
      <div className="col-12 col-md-4 align-self-center">
        <Link href="/north-america">
          <div
            className="group container d-flex flex-column justify-content-center align-items-center"
            onClick={() => dispatch(updateCurrentMap('north-america'))}
          >
            <div className="group-map north-america"></div>
            <h2 className="group-title">North America</h2>
          </div>
        </Link>
      </div>
      <div className="col-12 col-md-4 align-self-center">
        <Link href="/south-america">
          <div
            className="group container d-flex flex-column justify-content-center align-items-center"
            onClick={() => dispatch(updateCurrentMap('south-america'))}
          >
            <div className="group-map south-america"></div>
            <h2 className="group-title">South America</h2>
          </div>
        </Link>
      </div>
      <div className="col-12 col-md-4 align-self-center">
        <Link href="/africa">
          <div
            className="group container d-flex flex-column justify-content-center align-items-center"
            onClick={() => dispatch(updateCurrentMap('africa'))}
          >
            <div className="group-map africa"></div>
            <h2 className="group-title">Africa</h2>
          </div>
        </Link>
      </div>
      <div className="col-12 col-md-4 align-self-center">
        <Link href="/asia">
          <div
            className="group container d-flex flex-column justify-content-center align-items-center"
            onClick={() => dispatch(updateCurrentMap('asia'))}
          >
            <div className="group-map asia"></div>
            <h2 className="group-title">Asia</h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default OptionsGrid;
