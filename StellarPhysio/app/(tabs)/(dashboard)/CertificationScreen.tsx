import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator } from 'react-native';
import Button from '@/components/Button';
import { useAchievements } from '@/context/AchievementsContext';

const CertificationScreen: React.FC = () => {
  const { achievements, fetchAchievements, loading } = useAchievements();

  useEffect(() => {
    fetchAchievements();
  }, []);

  const renderCertificate = ({ item }: { item: Achievement }) => (
    <View style={styles.certificateItem}>
      <Image source={{ uri: item.imageUrl }} style={styles.certificateImage} />
      <View style={styles.certificateInfo}>
        <Text style={styles.certificateTitle}>{item.title}</Text>
        <Text style={styles.certificateDate}>Awarded on: {item.date}</Text>
      </View>
      <Button
        title="View"
        onPress={() => {/* Implement view certificate logic */}}
        style={styles.viewButton}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Certifications</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={achievements}
          renderItem={renderCertificate}
          keyExtractor={item => item.id}
        />
      )}
      <Button
        title="Upload New Certificate"
        onPress={() => {/* Implement upload new certificate logic */}}
        style={styles.uploadButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F5F8FA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  certificateItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  certificateImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  certificateInfo: {
    flex: 1,
  },
  certificateTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  certificateDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  viewButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  uploadButton: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
  },
});

export default CertificationScreen;