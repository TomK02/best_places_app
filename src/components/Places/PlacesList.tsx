import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { type PlaceType } from '../../models/places';
import PlaceItem from './PlaceItem';
import { GlobalTheme } from '../../themes/constants';

interface PlacesListProps {
  places: PlaceType[];
}

function PlacesList({ places }: PlacesListProps) {
  const selectPlacesHandler = () => {};

  if (places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={places}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => (
        <PlaceItem place={item} onSelect={selectPlacesHandler} />
      )}
    />
  );
}

export default PlacesList;

const styles = StyleSheet.create({
  fallbackContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fallbackText: {
    fontSize: 16,
    color: GlobalTheme.colors.primary200,
  },
});
