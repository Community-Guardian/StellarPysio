import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Use router for navigation
import { useArticles } from '@/context/ArticlesContext'; // Ensure correct import path

const ArticlesScreen: React.FC = () => {
  const [searchText, setSearchText] = useState('');
  const router = useRouter(); // Router hook for navigation
  const { articles, fetchArticles, loading } = useArticles(); // Fetch articles from context

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  // Extract unique article types from articles
  const articleTypes = articles.reduce((acc, article) => {
    const { article_type } = article;
    if (!acc.find((type) => type.id === article_type.id)) {
      acc.push(article_type);
    }
    return acc;
  }, []);

  // Filter articles based on search text
  const filteredArticleTypes = articleTypes.filter((type) =>
    type.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search articles..."
        placeholderTextColor="#aaa"
        value={searchText}
        onChangeText={handleSearch}
      />

      {/* Categories */}
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <ScrollView style={styles.scrollView}>
          {filteredArticleTypes.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={styles.categoryCard}
              onPress={() => {
                router.push(`/workoutarticles/?articleTypeId=${category.id}`); // Navigate to articles by category
              }}
            >
              <View style={styles.categoryHeader}>
                <Ionicons
                  name={category.icon}
                  size={24}
                  color="#4A90E2"
                  style={styles.categoryIcon}
                />
                <Text style={styles.categoryTitle}>{category.name}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
    fontSize: 14,
    color: '#333',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  scrollView: {
    flex: 1,
  },
  categoryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryIcon: {
    marginRight: 8,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default ArticlesScreen;