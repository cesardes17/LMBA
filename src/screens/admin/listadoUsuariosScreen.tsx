import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import { usuariosMock } from '@/src/data/usuariosMock';
import { UserCardList } from '@/src/components/admin/userCardList';
import StyledTextInput from '@/src/components/common/StyledTextInput';
import Separator from '@/src/components/common/Separator';

export default function ListadoUsuariosScreen() {
  const [searchText, setSearchText] = useState('');

  const filteredUsuarios = usuariosMock.filter((usuario) => {
    const fullName = `${usuario.nombre} ${usuario.apellidos}`.toLowerCase();
    return (
      fullName.includes(searchText.toLowerCase()) ||
      usuario.email.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  return (
    <View style={{ flex: 1 }}>
      <StyledTextInput
        placeholder='Buscar por nombre, apellidos o correo'
        value={searchText}
        onChangeText={setSearchText}
      />
      <Separator />
      <FlatList
        data={filteredUsuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <UserCardList
            usuario={item}
            onEdit={(usuario) => console.log('Edit:', usuario)}
            onBan={(usuario) => console.log('Ban:', usuario)}
          />
        )}
      />
    </View>
  );
}
