import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/utils/colors';
import { useServices } from '@/context/ServicesContext';
import { useRouter } from 'expo-router';
const ServicesScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const { services, loading } = useServices(); // Fetch services from context

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
console.log(filteredServices);

  const handleBookNow = (service: any) => {
    router.push(`/(tabs)/(dashboard)/book_appointment?selectedService=${service.id}`);
  };

  const renderServiceItem = ({ item }: { item: any }) => (
    <View style={styles.serviceItem}>
      <Text style={styles.serviceName}>{item.name}</Text>
      <Text style={styles.serviceDescription}>{item.description}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Learn More</Text>
        </TouchableOpacity>
        {item.serviceType == 'Prescriptions' ? (
          <TouchableOpacity
            style={[styles.button, styles.payButton]}
            onPress={() => handlePayNow(item)}
          >
            <Text style={styles.buttonText}>Pay Now</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.button, styles.bookButton]}
            onPress={() => handleBookNow(item)}
          >
            <Text style={styles.buttonText}>Book Now</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
  
  // Handle Pay Now Button
  const handlePayNow = (service: any) => {
    router.push(`/(tabs)/(finances)/pay_now?serviceId=${service.id}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color={colors.lightText} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search services"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <FlatList
          data={filteredServices}
          renderItem={renderServiceItem}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text style={styles.emptyMessage}>No services found.</Text>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  payButton: {
    backgroundColor: colors.secondary, // Add an accent color for the Pay Now button
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: colors.text,
    paddingVertical: 12,
  },
  serviceItem: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  serviceDescription: {
    fontSize: 14,
    color: colors.lightText,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  bookButton: {
    backgroundColor: colors.secondary,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
  emptyMessage: {
    textAlign: 'center',
    color: colors.lightText,
    fontSize: 16,
    marginTop: 20,
  },
});

export default ServicesScreen;
