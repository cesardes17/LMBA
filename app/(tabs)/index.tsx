import React from 'react';
import { View, StyleSheet } from 'react-native';
import PageContainer from '@/src/components/layout/PageContainer';
import StyledText from '@/src/components/common/StyledText';

export default function TabsIndex() {
  return (
    <PageContainer>
      <View style={styles.center}>
        <StyledText>Estas en el index de tabs</StyledText>
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
