import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import MapView, {
  LatLng,
  MapPressEvent,
  Marker,
  Region,
} from 'react-native-maps';

import { NavigationTypeProp } from '../types/navigation';
import IconButton from '../components/ui/IconButton';

interface MapProps {
  navigation: NavigationTypeProp<'AddPlace'>;
}

function Map({ navigation }: MapProps) {
  const [selectedLocation, setSelectedLocation] = useState<LatLng | null>(null);

  const region: Region = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (e: MapPressEvent) => {
    const latitude = e.nativeEvent.coordinate.latitude;
    const longitude = e.nativeEvent.coordinate.longitude;

    setSelectedLocation({ latitude, longitude });
  };

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        'No location picked!',
        'You have to pick a location (by tapping on the map) first!',
      );
      return;
    }

    navigation.navigate('AddPlace', {
      pickedLat: selectedLocation.latitude,
      pickedLng: selectedLocation.longitude,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) =>
        IconButton({
          icon: 'save',
          size: 24,
          color: tintColor,
          onPress: savePickedLocationHandler,
        }),
    });
  }, [navigation, savePickedLocationHandler]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}>
      {selectedLocation && (
        <Marker
          coordinate={{
            latitude: selectedLocation?.latitude,
            longitude: selectedLocation?.longitude,
          }}
        />
      )}
    </MapView>
  );
}

export default Map;

const styles = StyleSheet.create({ map: { flex: 1 } });
