import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {useAppSelector, useAppDispatch} from '../store/hooks';
import {ProductCard} from '../components/ProductCard';
// @ts-ignore
import Feather from 'react-native-vector-icons/Feather';

export const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useAppDispatch();
  const {items: products, isLoading} = useAppSelector(state => state.products);

  const filteredProducts = products.filter(
    product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Feather
          name="search"
          size={20}
          color="#666"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {searchQuery.length > 0 && (
          <Feather
            name="x"
            size={20}
            color="#666"
            style={styles.clearIcon}
            onPress={() => setSearchQuery('')}
          />
        )}
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={({item}) => <ProductCard product={item} />}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.productList}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    color: '#333',
  },
  clearIcon: {
    marginLeft: 8,
    padding: 4,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productList: {
    padding: 16,
  },
});
