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
import {ProductModal} from '../components/ProductModal';
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
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

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

  const handleProductPress = (product: any) => {
    setSelectedProduct(product);
    setModalVisible(true);
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
              onPress={() => handleProductPress(item)}
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

      <ProductModal
        visible={modalVisible}
        product={selectedProduct}
        onClose={() => setModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    margin: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#000',
    marginLeft: 10,
  },
  searchIcon: {
    marginRight: 5,
  },
  clearIcon: {
    padding: 5,
  },
  productList: {
    padding: 10,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  emptyText: {
    color: '#8E8E93',
    fontSize: 16,
    textAlign: 'center',
  },
  loader: {
    marginTop: 20,
  },
});
