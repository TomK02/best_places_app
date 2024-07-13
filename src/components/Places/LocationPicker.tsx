import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  PermissionsAndroid,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Geolocation, { GeoCoordinates } from 'react-native-geolocation-service';
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from '@react-navigation/native';

import OutlinedButton from '../ui/OutlinedButton';
import { GlobalTheme } from '../../themes/constants';
import { getAddress, getMapPreview } from '../../utils/location';
import { NavigationTypeProp, RouteTypeProp } from '../../types/navigation';
import { Location } from '../../models/places';

type LocationT = {
  lat: GeoCoordinates['latitude'];
  lng: GeoCoordinates['longitude'];
};

interface LocationPickerProps {
  onPickLocation: (location: Location) => void;
}

function LocationPicker({ onPickLocation }: LocationPickerProps) {
  const [pickedLocation, setPickedLocation] = useState<LocationT | null>(null);
  const isFocused = useIsFocused();

  const navigation = useNavigation<NavigationTypeProp<'Map'>>();
  const route = useRoute<RouteTypeProp<'AddPlace'>>();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  useEffect(() => {
    const handleLocation = async () => {
      if (pickedLocation) {
        const address = await getAddress(pickedLocation);

        onPickLocation({
          latitude: pickedLocation.lat,
          longitude: pickedLocation.lng,
          address,
        });
      }
    };
    handleLocation();
  }, [pickedLocation, onPickLocation]);

  const verifyPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        return true;
      } else {
        Alert.alert(
          'Insufficient Permissions!',
          'You need to grant location permissions to use this app.',
        );
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermission();

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      (position) => {
        console.log({ position });
        setPickedLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  const pickOnMapHandler = () => {
    navigation.navigate('Map');
  };

  let locationPreview = <Text>No location picked yet</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{ uri: getMapPreview(pickedLocation) }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location-arrow" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalTheme.colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
});
