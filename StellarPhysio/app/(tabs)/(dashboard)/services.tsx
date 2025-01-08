import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useServices } from '@/context/ServicesContext'; // Ensure proper import path
import { usePayments } from '@/context/PaymentContext'; // Ensure proper import path

interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  service_type: {
    name: string;
  };
}

const ServicesScreen: React.FC = () => {
  const router = useRouter();
  const { services, fetchServices, loading } = useServices();
  const { createPaymentIntent } = usePayments();
  const [searchQuery, setSearchQuery] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const handlePayNow = (serviceId: string) => {
    console.log('Pay now', serviceId);
    router.push(`/(tabs)/(finances)/pay_now?serviceId=${serviceId}`);

  };

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const renderServiceItem = ({ item }: { item: Service }) => (
    <View style={styles.serviceCard}>
      <Text style={styles.serviceName}>{item.name}</Text>
      <Text style={styles.serviceDescription}>{item.description}</Text>
      <View style={styles.serviceActions}>
        <TouchableOpacity style={styles.priceButton}>
          <Text style={styles.buttonText}>Price(ksh): {item.price}</Text>
        </TouchableOpacity>
        {item.serviceType === 'Prescriptions' ? (
          <TouchableOpacity style={styles.payNowButton} onPress={() => handlePayNow(item.id)}>
            <Text style={styles.buttonText}>Pay Now</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.bookNowButton} onPress={() => { router.push(`/book_appointment?serviceId=${item.id}`) }}>
            <Text style={styles.buttonText}>Book Now</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search services..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      {loading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading services...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredServices}
          renderItem={renderServiceItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No services found</Text>
            </View>
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },
  searchBar: {
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  serviceCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 8,
  },
  serviceActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceButton: {
    backgroundColor: '#17a2b8',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  bookNowButton: {
    backgroundColor: '#28a745',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  payNowButton: {
    backgroundColor: '#ffc107',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6c757d',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#6c757d',
  },
});

export default ServicesScreen;