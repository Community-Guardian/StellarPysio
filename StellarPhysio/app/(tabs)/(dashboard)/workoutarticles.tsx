import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useArticles } from '@/context/ArticlesContext'; // Ensure correct import path

const WorkoutArticlesScreen: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const { articles, fetchArticles, loading } = useArticles();
  const { articleTypeId } = useLocalSearchParams(); // Get the article type ID from the query params
  const router = useRouter();

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleSearch = (text: string) => {
    setSearch(text);
  };

  // Filter articles based on the articleTypeId
  const filteredArticles = articles.filter(
    (article) => article.article_type.id === parseInt(articleTypeId as string)
  ).filter((article) =>
    article.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search for a workout..."
        placeholderTextColor="#aaa"
        value={search}
        onChangeText={handleSearch}
      />

      {/* Articles Grid */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView contentContainerStyle={styles.grid}>
          {filteredArticles.map((article, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() => setSelectedArticle(article)}
            >
              <Image source={{ uri: article.cover_image }} style={styles.cardImage} />
              <Text style={styles.cardTitle}>{article.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      {/* Modal for Article Content */}
      {selectedArticle && (
        <Modal
          visible={true}
          transparent
          animationType="slide"
          onRequestClose={() => setSelectedArticle(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedArticle.title}</Text>
              <ScrollView>
                <Image source={{ uri: selectedArticle.cover_image }} style={styles.modalImage} />
                <Text style={styles.modalText}>{selectedArticle.content}</Text>
              </ScrollView>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedArticle(null)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
  },
  searchBar: {
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#333',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: 100,
  },
  cardTitle: {
    padding: 8,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  modalImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
  },
  modalText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 16,
  },
  closeButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default WorkoutArticlesScreen;