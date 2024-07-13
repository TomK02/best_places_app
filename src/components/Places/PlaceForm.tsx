import React, { useCallback, useState } from 'react';
import { Text, ScrollView, View, TextInput, StyleSheet } from 'react-native';
import { GlobalTheme } from '../../themes/constants';
import ImagePicker from './ImagePicker';
import LocationPicker from './LocationPicker';
import Button from '../ui/Button';
import Place, { Location } from '../../models/places';

interface onCreatePlace {
  createPlaceHandler: (
    title: string,
    image: string,
    location: Location,
  ) => void;
}

function PlaceForm({ onCreatePlace }: onCreatePlace) {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [pickedLocation, setPickedLocation] = useState<Location | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');

  const changeTitleHandler = (enteredText: string) => {
    setEnteredTitle(enteredText);
  };

  const takeImageHandler = (imageUri: string) => {
    setSelectedImage(imageUri);
  };

  const pickLocationHandler = useCallback((location: Location) => {
    setPickedLocation(location);
  }, []);

  const savePlaceHandler = () => {
    if (!enteredTitle || !selectedImage || !pickedLocation) {
      throw new Error('Invalid input');
    }

    const placeData = new Place(enteredTitle, selectedImage, pickedLocation);
    console.log(placeData);
  };

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>

      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
    </ScrollView>
  );
}

export default PlaceForm;

const styles = StyleSheet.create({
  form: { flex: 1, padding: 24 },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: GlobalTheme.colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: GlobalTheme.colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: GlobalTheme.colors.primary100,
  },
});
