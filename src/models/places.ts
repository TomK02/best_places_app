import { LatLng } from 'react-native-maps';

export type Location = LatLng & {
  address: string;
};

export class Place {
  address: string;
  id: string;

  constructor(
    public title: string,
    public imageUrl: string,
    public location: Location,
  ) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.address = location.address;
    this.location = {
      latitude: location.latitude,
      longitude: location.longitude,
      address: location.address,
    };
    this.id = new Date().toISOString() + Math.random().toString();
  }
}

export type PlaceType = InstanceType<typeof Place>;
export default Place;
