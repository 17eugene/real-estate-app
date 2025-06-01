import { useRef, useCallback } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { mapTheme } from "./Theme";
import styles from "./Map.module.scss";

const mapOptions = {
  panControl: true,
  zoomControl: true,
  mapTypeControl: true,
  scaleControl: true,
  streetViewControl: false,
  rotateControl: false,
  clickableIcons: false,
  keyboardshortcuts: false,
  scrollwheel: false,
  disableDoubleClickZoom: true,
  fullscreenControl: false,
  styles: mapTheme,
};

const Map = ({ position }) => {
  const mapRef = useRef(undefined);
  // const { AdvancedMarkerElement } = window.google.maps.marker;

  const onLoad = useCallback(function callback(map) {
    mapRef.current = map;
  }, []);

  const onUnmount = useCallback(function callback() {
    mapRef.current = undefined;
  }, []);

  return (
    <>
      <div className={styles.map}>
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={position}
          zoom={13}
          onLoad={onLoad}
          onUnmount={onUnmount}
          options={mapOptions}
        >
          {/* Child components, such as markers, info windows, etc. */}
          {mapRef?.current && <Marker position={position} />}
        </GoogleMap>
      </div>
    </>
  );
};

// const Map = () => {
//   return (
//     <div>
//       <MapContainer
//         className={styles.mapContainer}
//         center={[46.35178, 30.42357]}
//         zoom={12}
//         scrollWheelZoom={false}
//       >
//         <TileLayer
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//       </MapContainer>
//     </div>
//   );
// };

export default Map;
