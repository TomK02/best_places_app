import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import { type PlaceType } from '../../models/places';

interface PlaceItemProps {
  place: PlaceType;
  onSelect: () => void;
}

function PlaceItem({ place, onSelect }: PlaceItemProps) {
  return (
    <Pressable onPress={onSelect}>
      <Image source={{ uri: place.imageUrl }} />
      <View>
        <Text>{place.title}</Text>
        <Text>{place.location.address}</Text>
      </View>
    </Pressable>
  );
}

export default PlaceItem;

// const styles = StyleSheet.create({});
