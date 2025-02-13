import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { supabase } from './utils/supabase';

export default function App() {
  const [horses, setHorses] = useState([]);

  useEffect(() => {
    const getHorses = async () => {
      try {
        const { data: horses, error } = await supabase.from('Horses').select();

        if (error) {
          console.error('Error fetching horses:', error.message);
          return;
        }

        if (horses && horses.length > 0) {
          setHorses(horses);
        }
      } catch (error) {
        console.error('Error fetching horses:', error.message);
      }
    };

    getHorses();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Todo List</Text>
      <FlatList
        data={horses}
        keyExtractor={(item) => item.name.toString()}
        renderItem={({ item }) => <Text key={item.id}>{item.title}</Text>}
      />
    </View>
  );
};