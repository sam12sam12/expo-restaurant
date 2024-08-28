import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { selectCartItems, selectCartTotal } from '../slices/cartSlice';
import { useTheme } from '../ThemeContext';
import Toast from 'react-native-toast-message';
import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';

export default function CartIcon() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  const { width, height } = useWindowDimensions();
  let paddings;
  if (width > 428) {
    paddings = ms(48);
  } else {
    paddings = ms(16);
  }

  let button;
  if (width > 428) {
    button = mvs(10);
  } else {
    button = mvs(15);
  }
  const handleNavigate = () => {
    navigation.navigate('Cart');
  };
  if (!cartItems.length) return null;

  return (
    <View
      style={{ paddingHorizontal: paddings, paddingBottom: vs(10) }}
      className="  absolute bottom-0 w-full z-50 flex-row justify-between items-center  rounded-full  pb-4 ">
      <TouchableOpacity
        onPress={handleNavigate}
        className=" w-full z-50 flex-row justify-between items-center  shadow-lg"
        style={{
          backgroundColor: colors.bgColor,
          borderRadius: 20,
          shadowColor: 'red',
          paddingHorizontal: s(20),
          paddingVertical: button,
        }}>
        {/* Price */}
        <View className="flex-row items-center justify-center">
          <Text style={styles(colors).buttonDescription}>{cartTotal}</Text>
          <Image
            style={styles(colors).coinImage}
            source={require('../assets/images/afghani.png')}
          />
        </View>
        {/* buttontitle */}
        <Text style={styles(colors).buttonTitle}>انتخابول</Text>
        {/* selectedItems */}
        <View
          className="  rounded-full items-center justify-center "
          style={styles(colors).itemsSelected}>
          <Text
            style={{ fontSize: ms(14), fontWeight: 'bold', color: 'white' }}>
            {cartItems.length}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = (colors) =>
  ScaledSheet.create({
    buttonTitle: {
      color: '#fff',
      fontSize: '18@mvs',
      fontWeight: 'bold',
    },
    buttonDescription: {
      color: '#fff',
      fontSize: ms(17),
      fontWeight: 'bold',
      marginRight: ms(3),
      marginBottom: ms(3),
    },
    coinImage: {
      width: '20@vs',
      height: '20@vs',
      alignItems: 'center',
      flex: 0,
    },
    itemsSelected: {
      backgroundColor: 'rgba(255,255,255,0.4)',
      width: '30@ms',
      height: '30@ms',
    },
  });
