import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://10.0.2.2:5000/api/products');
      setProducts(res.data);
    } catch (error) {
      console.error('Error fetching products:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {item.images && item.images[0]?.uri ? (
        <Image source={{ uri: item.images[0].uri }} style={styles.image} />
      ) : (
        <View style={styles.placeholder}><Text style={{ color: '#aaa' }}>No Image</Text></View>
      )}
      <View style={styles.details}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>₹{item.price}</Text>
        <Text style={styles.condition}>{item.condition}</Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#1e64e1" />
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item._id}
      renderItem={renderItem}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
    backgroundColor: '#111',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#222',
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: 100,
    height: 100,
  },
  placeholder: {
    width: 100,
    height: 100,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  details: {
    padding: 10,
    flex: 1,
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  price: {
    color: '#1e90ff',
    marginTop: 4,
  },
  condition: {
    color: '#aaa',
    marginTop: 2,
  },
  category: {
    color: '#888',
    fontStyle: 'italic',
    marginTop: 2,
  },
  loader: {
    flex: 1,
    backgroundColor: '#111',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductList;
