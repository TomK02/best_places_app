import React from 'react';
import PlaceForm from '../components/Places/PlaceForm';
import { NavigationTypeProp } from '../types/navigation';

interface AddPlaceProps {
  navigation: NavigationTypeProp<'AddPlace'>;
}

function AddPlace({ navigation }: AddPlaceProps) {
  const createPlaceHandler = () => {};

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}

export default AddPlace;
