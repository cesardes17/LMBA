import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '@/src/hooks/useTheme';
import StyledText from '../common/StyledText';

interface RouteListProps {
  rutas: {
    key: string;
    nombre: string;
    descripcion: string;
    ruta: string;
  }[];
  onPress: (ruta: string) => void;
}

export default function RouteList({ rutas, onPress }: RouteListProps) {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {rutas.map((ruta) => (
        <TouchableOpacity
          key={ruta.key}
          style={[
            styles.card,
            {
              backgroundColor: theme.cardBackground,
              borderColor: theme.border,
              shadowColor: theme.primary + '33', // Sombra con opacidad
            },
          ]}
          onPress={() => onPress(ruta.ruta)}
        >
          <StyledText style={[styles.cardTitle, { color: theme.textPrimary }]}>
            {ruta.nombre}
          </StyledText>
          <StyledText
            style={[styles.cardDescription, { color: theme.textSecondary }]}
          >
            {ruta.descripcion}
          </StyledText>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  card: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    elevation: 2,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: 14,
  },
});
