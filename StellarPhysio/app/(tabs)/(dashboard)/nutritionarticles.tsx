import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
  ScrollView,
} from 'react-native';

interface NutritionArticle {
  title: string;
  image: string;
  content: string;
}

const NutritionArticlesScreen: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<NutritionArticle | null>(null);

  const nutritionArticles: NutritionArticle[] = [
    {
      title: 'Healthy Eating Habits',
      image: 'https://www.pcrm.org/sites/default/files/2020-06/grilling-veggies.jpg', // Replace with actual image URL
      content: 'Discover the best eating habits for a healthy lifestyle. Healthy eating involves incorporating a variety of foods in balanced proportions, with an emphasis on whole grains, vegetables, lean proteins, and healthy fats. Emphasize hydration, and avoid processed foods and excess sugar to maintain overall wellness. Developing a mindful eating practice helps prevent overeating and promotes better digestion.',
    },
    {
      title: 'Nutrition for Muscle Gain',
      image: 'https://gravity.fitness/cdn/shop/articles/How_to_eat_for_healthy_muscle_gain.jpg?v=1726032921&width=2048', // Replace with actual image URL
      content: 'Optimize your nutrition to build muscle effectively. Focus on consuming protein-rich foods like lean meats, eggs, tofu, and legumes to support muscle repair and growth. Carbohydrates are essential to fuel workouts and aid recovery, while healthy fats provide energy. Consider eating multiple smaller meals throughout the day to maintain a steady supply of nutrients and promote muscle synthesis.',
    },
    {
      title: 'Balanced Diet',
      image: 'https://www.eggoz.com/cdn/shop/articles/Blog-Cover-Image-Final-1920-x-1080-px-1080-x-1920-px-766-x-500-px-73.webp?v=1720532642', // Replace with actual image URL
      content: 'Learn the principles of a balanced diet for overall health. A balanced diet includes a variety of foods from all food groups: fruits, vegetables, whole grains, lean proteins, and dairy. Each group provides essential nutrients that your body needs to function optimally. Ensure you’re getting the right proportions to meet your calorie needs, and always prioritize natural, nutrient-dense foods over processed ones.',
    },
    {
      title: 'Superfoods',
      image: 'https://momentuminjury.com/wp-content/uploads/2024/02/Top-10-Superfoods-to-Accelerate-Weight-Loss_Momentum-Medical-768x512.png', // Replace with actual image URL
      content: 'Explore the health benefits of incorporating superfoods into your meals. Superfoods are nutrient-dense foods that offer a wide range of health benefits, from boosting immunity to improving heart health. Some popular superfoods include blueberries, spinach, chia seeds, avocados, and salmon. Including these foods regularly can help support your overall health and prevent chronic diseases.',
    },
    {
      title: 'Vegan Nutrition',
      image: 'https://cdn.shopify.com/s/files/1/0569/3279/4461/files/Vegan_Diet_1.jpg', // Replace with actual image URL
      content: 'Understand the essentials of a healthy vegan diet. A vegan diet can be highly nutritious when planned properly. It is essential to include a variety of plant-based proteins such as lentils, beans, tofu, and quinoa, as well as plenty of fruits and vegetables. Don’t forget about essential nutrients like Vitamin B12, Vitamin D, Omega-3 fatty acids, and iron, which may need to be supplemented in a vegan diet.',
    },
    {
      title: 'Weight Management',
      image: 'https://health.mil/-/media/Images/MHS/Infographics/January-Toolkit-2022/WeightManagement_scale.jpg', // Replace with actual image URL
      content: 'Tips and strategies for effective weight management through nutrition. Focus on creating a sustainable caloric deficit through a combination of healthy eating and regular physical activity. Prioritize whole foods, lean proteins, fiber-rich vegetables, and healthy fats to keep you satisfied and energized throughout the day. Avoid extreme diets and instead aim for long-term lifestyle changes to achieve and maintain a healthy weight.',
    },
  ];

  const filteredArticles = nutritionArticles.filter((article) =>
    article.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search for nutrition articles..."
        placeholderTextColor="#aaa"
        value={search}
        onChangeText={setSearch}
      />

      {/* Articles Grid */}
      <ScrollView contentContainerStyle={styles.grid}>
        {filteredArticles.map((article, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => setSelectedArticle(article)}
          >
            <Image source={{ uri: article.image }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{article.title}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

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
                <Image source={{ uri: selectedArticle.image }} style={styles.modalImage} />
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

export default NutritionArticlesScreen;
