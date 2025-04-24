import React from 'react';
import { Image, ImageProps, StyleSheet, View } from 'react-native';
import { useTheme } from '@/src/hooks/useTheme';

interface StyledImageProps extends ImageProps {
  size?: number;
}

export default function StyledImage({
  size = 120,
  style,
  ...props
}: StyledImageProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.imageContainer}>
      <Image
        {...props}
        style={[
          styles.image,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            borderColor: theme.border,
          },
          style,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    borderWidth: 2,
  },
});
