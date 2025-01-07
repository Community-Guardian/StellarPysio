import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Service {
  id: string;
  name: string;
  description: string;
}

const ServicesScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const services: Service[] = [
    { id: '1', name: 'Manual Therapy', description: 'Hands-on treatment to manipulate joints and soft tissue.' },
    { id: '2', name: 'Sports Therapy', description: 'Specialized treatment for sports-related injuries and performance enhancement.' },
    { id: '3', name: 'Rehabilitation', description: 'Comprehensive programs to restore function after injury or surgery.' },
    { id: '4', name: 'Massage Therapy', description: 'Therapeutic massage to relieve muscle tension and promote relaxation.' },
  ];

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderServiceItem = ({ item }: { item: Service }) => (
    <View className="bg-white p-4 rounded-lg mb-4">
      <Text className="text-lg font-bold text-text mb-2">{item.name}</Text>
      <Text className="text-sm text-lightText mb-4">{item.description}</Text>
      <View className="flex-row justify-between">
        <TouchableOpacity className="bg-primary py-2 px-4 rounded-lg">
          <Text className="text-white font-bold">Learn More</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-secondary py-2 px-4 rounded-lg">
          <Text className="text-white font-bold">Book Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-background p-6">
      <Text className="text-2xl font-bold text-text mb-6">Our Services</Text>
      <View className="flex-row items-center bg-white rounded-lg p-2 mb-4">
        <Ionicons name="search" size={24} color="#777777" />
        <TextInput
          className="flex-1 ml-2 text-base"
          placeholder="Search services"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredServices}
        renderItem={renderServiceItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ServicesScreen;

