import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Button from '@/components/Button';
import { useAchievements } from '@/context/AchievementsContext';

// Achievement Interface
interface Achievement {
  id: string;
  date: string;
  certification: Certification;
}

interface Certification {
  description: string;
  title: string;
  image_url: string;
}

const CertificationScreen: React.FC = () => {
  const { achievements, fetchAchievements, loading } = useAchievements();
  const [selectedCertificate, setSelectedCertificate] = useState<Achievement | null>(null);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const renderCertificate = ({ item }: { item: Achievement }) => (
    <View style={styles.certificateItem}>
      <Image source={{ uri: item.certification.image_url }} style={styles.certificateImage} />
      <View style={styles.certificateInfo}>
        <Text style={styles.certificateTitle}>{item.certification.title}</Text>
        <Text style={styles.certificateDate}>Awarded on: {item.date}</Text>
      </View>
      <Button
        title="View"
        onPress={() => setSelectedCertificate(item)}
        style={styles.viewButton}
      />
    </View>
  );

  const closeModal = () => {
    setSelectedCertificate(null);
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={achievements}
          renderItem={renderCertificate}
          keyExtractor={(item) => item.id}
        />
      )}

      {/* Modal for Certificate Details */}
      <Modal
        visible={!!selectedCertificate}
        animationType="slide"
        transparent={true}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedCertificate && (
              <>
                <Image
                  source={{ uri: selectedCertificate.certification.image_url }}
                  style={styles.modalImage}
                />
                <Text style={styles.modalTitle}>
                  {selectedCertificate.certification.title}
                </Text>
                <Text style={styles.modalDate}>
                  Awarded on: {selectedCertificate.date}
                </Text>
                <Text style={styles.modalDescription}>
                  {selectedCertificate.certification.description}
                </Text>
                <Button title="Close" onPress={closeModal} style={styles.closeButton} />
              </>
            )}
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalDate: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#FF5A5F',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
});

export default CertificationScreen;
