import React, { useState } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { GlobalTheme } from '../../themes/constants';
import OutlinedButton from '../ui/OutlinedButton';

interface ImagePickerProps {
  onTakeImage: (imageUri: string) => void;
}

function ImagePicker({ onTakeImage }: ImagePickerProps) {
  const [pickedImage, setPickedImage] = useState<string>();
  const verifyPermissions = async () => {
    // add logic to verify permissions for IOS specifically since Android permissions are handled automatically

    const delay = (ms: number, value: boolean) =>
      new Promise((res) => setTimeout(() => res(value), ms));
    return await delay(1000, true);
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCamera({
      mediaType: 'photo',
      quality: 0.5,
    });

    if (image.didCancel) {
      return;
    }

    if (image.assets) {
      setPickedImage(image.assets[0].uri);
      onTakeImage(image.assets[0].uri ?? '');
    }
  };

  let imagePreview = <Text>No image picked yet.</Text>;

  if (pickedImage) {
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }
  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton
        children="Take Image"
        onPress={takeImageHandler}
        icon={'camera'}
      />
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalTheme.colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
