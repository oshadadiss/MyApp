import React from 'react';
import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import Slider from '@react-native-community/slider';
import {useAppDispatch} from '../store/hooks';
import {addItem} from '../store/slices/cartSlice';
import type {Product} from '../store/slices/productSlice';

interface ProductModalProps {
  visible: boolean;
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  visible,
  product,
  onClose,
}) => {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = React.useState(1);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addItem({...product, quantity}));
      onClose();
      Alert.alert(
        'Success',
        `${product.title} has been added to your cart`,
        [{text: 'OK', style: 'default'}],
        {cancelable: true},
      );
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ScrollView>
            {product && (
              <>
                <Image
                  source={{uri: product.thumbnail}}
                  style={styles.modalImage}
                  resizeMode="cover"
                />
                <Text style={styles.modalTitle}>{product.title}</Text>
                <Text style={styles.modalDescription}>{product.description}</Text>
                <View style={styles.modalDetails}>
                  <Text style={styles.modalCategory}>
                    Category: {product.category}
                  </Text>
                  <Text style={styles.modalRating}>
                    Rating: ★ {product.rating.toFixed(1)}
                  </Text>
                </View>
                <View style={styles.quantityContainer}>
                  <Text style={styles.quantityLabel}>Quantity: {quantity}</Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={1}
                    maximumValue={10}
                    step={1}
                    value={quantity}
                    onValueChange={setQuantity}
                    minimumTrackTintColor="#007AFF"
                    maximumTrackTintColor="#000000"
                  />
                </View>
                <Text style={styles.totalPrice}>
                  Total: ${(product.price * quantity).toFixed(2)}
                </Text>
              </>
            )}
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={handleAddToCart}>
                <Text style={styles.addToCartButtonText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalImage: {
    width: '100%',
    height: 250,
    borderRadius: 10,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
    lineHeight: 22,
  },
  modalDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  modalCategory: {
    fontSize: 14,
    color: '#666',
  },
  modalRating: {
    fontSize: 14,
    color: '#FFB800',
    fontWeight: '600',
  },
  quantityContainer: {
    marginBottom: 15,
  },
  quantityLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  closeButton: {
    backgroundColor: '#8E8E93',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  closeButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  addToCartButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
  },
  addToCartButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
});