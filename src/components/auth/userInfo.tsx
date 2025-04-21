import { Usuario } from '@/src/types/models/Usuario';
import { Text, View } from 'react-native';

interface PerfilCardProps {
  usuario: Usuario | null;
}

export default function PerfilCard({ usuario }: PerfilCardProps) {
  return (
    <View
      style={{
        marginVertical: 16,
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#f9f9f9',
        width: '90%',
      }}
    >
      {usuario ? (
        <>
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>
            Información del perfil:
          </Text>
          <Text>Nombre: {usuario.nombre}</Text>
          <Text>Apellidos: {usuario.apellidos}</Text>
          <Text>Rol ID: {usuario.rol_id}</Text>
        </>
      ) : (
        <>
          <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 8 }}>
            No hay información del perfil.
          </Text>
        </>
      )}
    </View>
  );
}
