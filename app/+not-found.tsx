import StyledText from '@/src/components/common/StyledText';
import PageContainer from '@/src/components/layout/PageContainer';
import HeaderConfig from '@/src/components/navigation/HeaderConfig';
import { View, StyleSheet } from 'react-native';

export default function NotFoundScreen() {
  return (
    <PageContainer>
      <View style={styles.container}>
        <HeaderConfig title='Pagina no encontrada' />
        <StyledText style={{ marginBottom: 16 }}>
          Pagina no encontrada
        </StyledText>
      </View>
    </PageContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
