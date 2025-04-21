import StyledText from '@/src/components/common/StyledText';
import PageContainer from '@/src/components/layout/PageContainer';
import React from 'react';
import { View, StyleSheet } from 'react-native';

export default function DrawerIndex() {
  return (
    <PageContainer>
      <View style={styles.center}>
        <StyledText>Estas en el index de drawer</StyledText>
      </View>
    </PageContainer>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
