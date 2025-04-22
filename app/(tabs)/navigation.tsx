import PageContainer from '@/src/components/layout/PageContainer';
import { StyleSheet, View } from 'react-native';
import StyledText from '@/src/components/common/StyledText';

export default function PartidosTabs() {
  return (
    <PageContainer>
      <View style={styles.center}>
        <StyledText>Estas en la pantalla de Navegacion de tabs</StyledText>
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
