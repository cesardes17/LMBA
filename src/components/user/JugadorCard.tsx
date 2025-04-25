// src/components/player/PlayerCard.tsx

import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import StyledText from '../common/StyledText';
import { useTheme } from '@/src/hooks/useTheme';
import { AlturaIcon, PesoIcon, PosicionIcon } from '@/src/constants/icons';
import { Jugador, Usuario } from '@/src/types/models/Usuario';
import { useResponsiveLayout } from '@/src/hooks/useResponsiveLayout';

export interface PlayerCardProps {
  jugador: Jugador;
  usuario: Usuario;
}

export default function JugadorCard({ jugador, usuario }: PlayerCardProps) {
  const { theme } = useTheme();
  const { isDesktop } = useResponsiveLayout();

  return isDesktop ? (
    <View style={styles.cardWeb}>
      <Image
        source={{ uri: jugador.foto_name }}
        style={styles.imageWeb}
        resizeMode='cover'
      />
      <View style={styles.contentWeb}>
        <StyledText style={styles.nombre}>
          {usuario.nombre + ' ' + usuario.apellidos}
        </StyledText>
        <StyledText style={styles.apellidos}>{usuario.rol_nombre}</StyledText>
        <View style={{ flexDirection: 'row' }}>
          <PosicionIcon color={theme.textPrimary} size={20} />
          <StyledText style={styles.text}>
            {jugador.posicion_preferida}
          </StyledText>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <AlturaIcon color={theme.textPrimary} size={20} />
          <StyledText style={styles.text}>{jugador.altura_cm} cm</StyledText>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <PesoIcon color={theme.textPrimary} size={20} />
          <StyledText style={styles.text}>{jugador.peso_kg} kg</StyledText>
        </View>
      </View>
    </View>
  ) : (
    <View style={styles.cardMobile}>
      <Image
        source={{ uri: jugador.foto_name }}
        style={styles.imageMobile}
        resizeMode='cover'
      />
      <View style={styles.dorsalContainer}>
        <StyledText style={styles.dorsal}>
          {jugador.dorsal_preferido}
        </StyledText>
      </View>
      <View style={styles.contentMobile}>
        <StyledText style={styles.nombre}>
          {usuario.nombre + ' ' + usuario.apellidos}
        </StyledText>
        <StyledText style={styles.apellidos}>{usuario.rol_nombre}</StyledText>
        <StyledText style={styles.text}>
          <PosicionIcon color={theme.textPrimary} />
          Posición: {jugador.posicion_preferida}
        </StyledText>
        <StyledText style={styles.text}>
          <AlturaIcon color={theme.textPrimary} />
          Altura: {jugador.altura_cm} cm
        </StyledText>
        <StyledText style={styles.text}>
          <PesoIcon color={theme.textPrimary} />
          Peso: {jugador.peso_kg} kg
        </StyledText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWeb: {
    flexDirection: 'row',
    width: '100%',
    maxWidth: 1200,
    marginHorizontal: 'auto',
    marginVertical: 20,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
  },
  imageWeb: {
    width: '30%',
    minWidth: 250,
    aspectRatio: 3 / 4,
  },
  cardMobile: {
    minWidth: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    alignSelf: 'center',
    elevation: 3,
  },
  imageMobile: {
    minWidth: '100%',
    minHeight: 400,
  },
  contentMobile: {
    marginTop: 12,
  },
  contentWeb: {
    padding: 12,
  },
  nombre: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  apellidos: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    marginBottom: 8,
    marginLeft: 8,
  },
  dorsalContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'red',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  dorsal: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
