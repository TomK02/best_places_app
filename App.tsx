/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AddPlace from './src/screens/AddPlace';
import AllPlaces from './src/screens/AllPlaces';
import Map from './src/screens/Map';
import IconButton from './src/components/ui/IconButton';
import { NavigationTypeProp } from './src/types/navigation';
import { GlobalTheme } from './src/themes/constants';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: GlobalTheme.colors.primary500,
            },
            headerTintColor: GlobalTheme.colors.gray700,
            contentStyle: {
              backgroundColor: GlobalTheme.colors.gray700,
            },
          }}>
          <Stack.Screen
            name="AllPlaces"
            component={AllPlaces}
            options={({
              navigation,
            }: {
              navigation: NavigationTypeProp<'AddPlace'>;
            }) => ({
              title: 'Your Favorite Places',
              headerRight: ({ tintColor }) =>
                IconButton({
                  icon: 'plus',
                  size: 24,
                  color: tintColor,
                  onPress: () => {
                    navigation.navigate('AddPlace');
                  },
                }),
            })}
          />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{
              title: 'Add a New Place',
            }}
          />
          {<Stack.Screen name="Map" component={Map} />}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default App;
