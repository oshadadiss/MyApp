import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import type {CartItem as CartItemType} from '../store/slices/cartSlice';
import {useAppDispatch} from '../store/hooks';
import {removeItem, updateQuantity} from '../store/slices/cartSlice';
// @ts-ignore
import Feather from 'react-native-vector-icons/Feather';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({item}) => {
  const dispatch = useAppDispatch();

  const handleIncrement = () => {
    dispatch(updateQuantity({id: item.id, quantity: item.quantity + 1}));
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({id: item.id, quantity: item.quantity - 1}));
    }
  };

  const handleRemove = () => {
    dispatch(removeItem(item.id));
  };

  return (
    <View style={styles.container}>
      <Image source={{uri: item.thumbnail}} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{item.title}</Text>
        <Text style={styles.price}>
          ${(item.price * item.quantity).toFixed(2)}
        </Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={handleDecrement}
            style={styles.quantityButton}>
            <Feather name="minus" size={20} color="#007AFF" />
          </TouchableOpacity>
          <Text style={styles.quantity}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={handleIncrement}
            style={styles.quantityButton}>
            <Feather name="plus" size={20} color="#007AFF" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity onPress={handleRemove} style={styles.removeButton}>
        <Feather name="trash-2" size={24} color="#FF3B30" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 12,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  details: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  name: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
    marginBottom: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    padding: 8,
  },
  quantity: {
    fontSize: 16,
    marginHorizontal: 12,
    color: '#333',
  },
  removeButton: {
    padding: 8,
    alignSelf: 'center',
  },
});
