import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchResult {
  id: string;
  title: string;
  type: 'article' | 'service' | 'provider';
}

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement actual search logic here
    const mockResults: SearchResult[] = [
      { id: '1', title: 'Understanding Physiotherapy', type: 'article' },
      { id: '2', title: 'Nutrition Consultation', type: 'service' },
      { id: '3', title: 'Dr. Jane Smith - Physiotherapist', type: 'provider' },
    ];
    setSearchResults(mockResults);
  };

  const renderSearchResult = ({ item }: { item: SearchResult }) => (
    <View style={styles.resultItem}>
      <Ionicons
        name={item.type === 'article' ? 'document-text' : item.type === 'service' ? 'medical' : 'person'}
        size={24}
        color="#4A90E2"
        style={styles.resultIcon}
      />
      <View>
        <Text style={styles.resultTitle}>{item.title}</Text>
        <Text style={styles.resultType}>{item.type}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Search</Text>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="#777" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for articles, services, or providers..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <FlatList
        data={searchResults}
        renderItem={renderSearchResult}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            {searchQuery ? 'No results found' : 'Start typing to search'}
          </Text>
        }
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  resultIcon: {
    marginRight: 15,
  },
  resultTitle: {
    fontSize: 16,
    color: '#333',
  },
  resultType: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default SearchScreen;

