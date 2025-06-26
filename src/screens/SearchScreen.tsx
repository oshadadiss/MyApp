import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';
import {useProducts} from '../hooks/useProducts';
import {ProductCard} from '../components/ProductCard';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
// @ts-ignore
import Feather from 'react-native-vector-icons/Feather';

type RootStackParamList = {
  Search: undefined;
  ProductDetails: {productId: number};
};

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;

export const SearchScreen: React.FC<Props> = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [previousQuery, setPreviousQuery] = useState('');
  const {searchResults, searchForProducts, isLoading, error} = useProducts();

  useEffect(() => {
    if (searchQuery.length >= 2 && searchQuery !== previousQuery) {
      searchForProducts(searchQuery);
      setPreviousQuery(searchQuery);
    }
  }, [searchQuery, previousQuery, searchForProducts]);

  const handleClearSearch = () => {
    setSearchQuery('');
    setPreviousQuery('');
  };

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
          placeholderTextColor="#666"
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
            onPress={handleClearSearch}
          />
        )}
      </View>

      {isLoading.search ? (
        <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
      ) : error.search ? (
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error.search}</Text>
        </View>
      ) : (
        <FlatList
          data={searchResults}
          renderItem={({item}) => (
            <ProductCard
              product={item}
              onPress={() =>
                navigation.navigate('ProductDetails', {productId: item.id})
              }
            />
          )}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.productList}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            searchQuery.length >= 2 ? (
              <View style={styles.centered}>
                <Text style={styles.emptyText}>No products found</Text>
              </View>
            ) : null
          }
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
  },
  productList: {
    padding: 16,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 16,
    textAlign: 'center',
  },
  emptyText: {
    color: '#8E8E93',
    fontSize: 16,
    textAlign: 'center',
  },
});
