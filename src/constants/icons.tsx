import React from 'react';
import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  SimpleLineIcons,
} from '@expo/vector-icons';
interface IconProps {
  size?: number;
  color: string;
}

export const HomeIcon = ({ size = 24, color }: IconProps) => {
  return <Entypo name='home' size={size} color={color} />;
};

export const PerfilIcon = ({ size = 24, color }: IconProps) => {
  return <FontAwesome name='user-circle' size={size} color={color} />;
};

export const CompletarPerfilIcon = ({ size = 24, color }: IconProps) => {
  return <FontAwesome5 name='user-edit' size={size} color={color} />;
};

export const LoginIcon = ({ size = 24, color }: IconProps) => {
  return <SimpleLineIcons name='login' size={size} color={color} />;
};

export const CalendarioIcon = ({ size = 24, color }: IconProps) => {
  return <FontAwesome5 name='calendar-alt' size={size} color={color} />;
};

export const ClasificacionIcon = ({ size = 24, color }: IconProps) => {
  return <FontAwesome5 name='trophy' size={size} color={color} />;
};

export const NavegacionIcon = ({ size = 24, color }: IconProps) => {
  return <Entypo name='menu' size={size} color={color} />;
};

export const SubirImagenIcon = ({ size = 24, color }: IconProps) => {
  return <FontAwesome5 name='image' size={size} color={color} />;
};

export const AlturaIcon = ({ size = 24, color }: IconProps) => {
  return <Entypo name='ruler' size={size} color={color} />;
};

export const PesoIcon = ({ size = 24, color }: IconProps) => {
  return <FontAwesome5 name='weight-hanging' size={size} color={color} />;
};

export const PosicionIcon = ({ size = 24, color }: IconProps) => {
  return <FontAwesome5 name='user-tie' size={size} color={color} />;
};
