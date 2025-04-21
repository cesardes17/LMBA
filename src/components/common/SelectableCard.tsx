import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface SelectableCardProps {
  id: string;
  title: string;
  description: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

export const SelectableCard: React.FC<SelectableCardProps> = ({
  id,
  title,
  description,
  isSelected,
  onSelect,
}) => {
  const cardStyle = isSelected
    ? {
        background: '#E0F7FA',
        border: '#00ACC1',
        title: '#007C91',
        description: '#004D5A',
        checkIcon: '#00ACC1',
      }
    : {
        background: '#fff',
        border: '#ccc',
        title: '#000',
        description: '#555',
        checkIcon: '#ccc',
      };

  return (
    <Pressable
      onPress={() => onSelect(id)}
      style={[
        styles.container,
        {
          backgroundColor: cardStyle.background,
          borderColor: cardStyle.border,
        },
      ]}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: cardStyle.title }]}>{title}</Text>
        <Text style={[styles.description, { color: cardStyle.description }]}>
          {description}
        </Text>
      </View>
      {isSelected && (
        <MaterialCommunityIcons
          name='check-circle'
          size={24}
          color={cardStyle.checkIcon}
          style={styles.icon}
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    marginVertical: 4,
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
  },
  icon: {
    marginLeft: 12,
  },
});
