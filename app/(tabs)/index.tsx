import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PageContainer from '@/src/components/layout/PageContainer';

export default function TabsIndex() {
  const title = 'Inicio';

  return (
    <PageContainer title={title}>
      <View style={styles.center}>
        <Text>Estas en el index de tabs</Text>
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
