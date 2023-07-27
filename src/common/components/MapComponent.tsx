import React, {ReactElement} from 'react';
import {StyleSheet} from 'react-native';
import YaMap, {Marker} from 'react-native-yamap';

import {INewCafeInfo} from '../helpers/replaceCafeList';

type Props = {
  renderCafeOnMap: (cafeName: string) => ReactElement<any, string>;
  goToCafe: (item: INewCafeInfo) => void;
  cafeList: INewCafeInfo[];
};
export const MapComponent = (props: Props) => {
  const {renderCafeOnMap, cafeList, goToCafe} = props;
  return (
    <YaMap
      userLocationIcon={{
        uri: 'https://geocode-maps.yandex.ru/1.x/?apikey=b7f1ce50-7a5c-49a0-8a55-0ed86cb939b9&geocode=37.597576,55.771899&format=json',
      }}
      style={styles.mapContainer}
      nightMode={true}
      showUserPosition={true}
      initialRegion={{
        lat: 46.835981,
        lon: 29.623765,
        zoom: 14,
        azimuth: 10,
        tilt: 40,
      }}>
      {cafeList.map(el => {
        const targetIndex = el.coordinates.indexOf(',');
        const lat = el.coordinates.slice(0, targetIndex);
        const lon = el.coordinates.slice(
          targetIndex + 2,
          el.coordinates.length,
        );
        return (
          <Marker
            point={{lat: +lat, lon: +lon}}
            key={+lat + +lon}
            children={renderCafeOnMap(el.name)}
            onPress={() => goToCafe(el)}
          />
        );
      })}
    </YaMap>
  );
};

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
  },
});
