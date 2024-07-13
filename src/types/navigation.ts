import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { LatLng } from 'react-native-maps';

export type ApplicationStackParamList = {
  AddPlace?: { pickedLat: LatLng['latitude']; pickedLng: LatLng['longitude'] };
  Map: undefined;
};

export type NavigationTypeProp<T extends keyof ApplicationStackParamList> =
  NativeStackNavigationProp<ApplicationStackParamList, T>;

export type RouteTypeProp<T extends keyof ApplicationStackParamList> =
  RouteProp<ApplicationStackParamList, T>;
