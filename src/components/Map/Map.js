/* eslint-disable react/style-prop-object, camelcase, consistent-return */
import { useAtom } from '@reatom/react';
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useMemo } from 'react';
import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import { allDataAtom } from 'store/atoms';
import styles from './map.module.css';

const reducer = (acc, {
  station_id, longitude, latitude, place_name, ...rest
}) => {
  if (acc[station_id]) {
    return ({
      ...acc,
      [station_id]: {
        ...acc[station_id],
        records: [...acc[station_id].records, { ...rest }],
      },
    });
  }
  return ({
    ...acc,
    [station_id]: {
      longitude, latitude, placeName: place_name, records: [{ ...rest }],
    },
  });
};

const Mapbox = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoibnNoa3V0b3YiLCJhIjoiY2tuNnJ2am51MGd4bzJyczRrcmFlOWVnOCJ9.Vlfg99TSAAkA5O4b0MlOSQ',
});

const Map = () => {
  const allData = useAtom(allDataAtom);

  const data = useMemo(() => allData.reduce(reducer, {}), [allData]);

  return (
    <Mapbox
      style="mapbox://styles/mapbox/light-v10"
      className={styles.map}
      center={['4.895168', '52.370216']}
      zoom={[8]}
    >
      {Object.entries(data).map(([id, {
        longitude, latitude, placeName, records,
      }]) => (
        <Marker coordinates={[longitude, latitude]} key={id} anchor="bottom" className={styles.marker}>
          <div className={styles.name}>{placeName}</div>
          <div className={styles.meta}>
            {records.slice(-1).map(({
              datetime, temperature_max, temperature_min,
            }) => (
              <div key={datetime}>
                <div>
                  {`Date: ${new Date(datetime).toLocaleDateString(undefined, {
                    weekday: 'short',
                    month: 'long',
                    day: 'numeric',
                  })} / ${new Date(datetime).toLocaleTimeString(undefined, {
                    hour12: false,
                    hour: '2-digit',
                    minute: '2-digit',
                  })}`}
                </div>
                <div>
                  <b>Max: </b>
                  {temperature_max}
                  {' '}
                  °C
                </div>
                <div>
                  <b>Min: </b>
                  {temperature_min}
                  {' '}
                  °C
                </div>
              </div>
            ))}
          </div>
        </Marker>
      ))}
    </Mapbox>
  );
};

export default Map;
