import React, { useState } from 'react';
import { StatusBar, View, useWindowDimensions } from 'react-native';
import { sendMessageToTelegram } from '../TelegramBotService';
import { useNavigation, useRoute } from '@react-navigation/native';

import Form from '../components/Form';
import Toast from 'react-native-toast-message';
import BackgroundImage from '../components/BackgroundImage';
import { useTheme } from '../ThemeContext';
import { s, vs, ms, mvs, ScaledSheet } from 'react-native-size-matters';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';

export default function FormScreen() {
  const { colors, activeTheme } = useTheme();
  const route = useRoute();
  const { groupedItems } = route.params;
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [nameError, setNameError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const navigation = useNavigation();
  // handleing Fields
  const handleNameChange = (text) => {
    setName(text);
    if (text.length >= 5 && text.length <= 12) {
      setNameError('');
    }
  };

  const handleAddressChange = (text) => {
    setAddress(text);
    if (text.length >= 8 && text.length <= 50) {
      setAddressError('');
    }
  };

  const handlePhoneNumberChange = (text) => {
    // Remove any non-numeric characters from the input
    const formattedText = text.replace(/[^0-9]/g, '');
    setPhoneNumber(formattedText);

    // Validate if the formatted input has 10 digits and starts with '0'
    if (formattedText[0] == '0') {
      setPhoneNumberError('صفر باید په سر کی نه وی');
      setPhoneNumber('');
    } else {
      setPhoneNumberError('');
    }
  };

  // handling Submit
  const handleSubmit = () => {
    let hasError = false;

    // Validate name
    if (name.length < 4 || name.length > 12) {
      setNameError(
        'نوم باید د څلورو حروفو څخه زیات وی او له ۱۲ حروفو څخه کم وی'
      );
      hasError = true;
    }

    // Validate address
    if (address.length < 8 || address.length > 50) {
      setAddressError('ادرس باید د اته حروفو څخه زیات وی');
      hasError = true;
    }

    // Validate phone number
    if (phoneNumber.length !== 9) {
      setPhoneNumberError(' د تیلیفون شماره باید د ۹ تورو درلودونکی وی');
      hasError = true;
    }

    if (hasError) {
      return;
    }

    // messegeToTelegram
    const message = constructMessage();
    const chatId = '-1001991135595';
    sendMessageToTelegram(message, chatId);

    setName('');
    setAddress('');
    setPhoneNumber('');
  };

  // the messege to be sent to telegram
  const constructMessage = () => {
    // Calculate the quantity and total price of each dish selected
    const dishDetails = groupedItems.reduce((details, items) => {
      items.forEach((item) => {
        if (!details[item.name]) {
          details[item.name] = {
            شمیر: 1, // Rename quantity to شمیر
            'مجموعه نرخ': item.price, // Rename totalPrice to مجموعه نرخ
          };
        } else {
          details[item.name].شمیر++; // Rename quantity to شمیر
          details[item.name]['مجموعه نرخ'] += item.price; // Rename totalPrice to مجموعه نرخ
        }
      });
      return details;
    }, {});

    // Construct and return the message
    let message = 'خوراکونه:\n';
    for (const dish in dishDetails) {
      // Add a food emoji 🍲 beside each dish name
      message += `- 🍲 ${dish}\nشمیر: ${dishDetails[dish].شمیر}\nمجموعه نرخ$${dishDetails[dish]['مجموعه نرخ']}\n`;
      message += '-----------------------\n'; // Separator line
    }

    // Calculate the total number of items
    const numberOfItems = Object.keys(dishDetails).length;

    // Calculate the cart total
    const cartTotal = Object.values(dishDetails).reduce(
      (total, detail) => total + detail['مجموعه نرخ'], // Rename totalPrice to مجموعه نرخ
      0
    );

    // Add total number of items and cart total to the message
    message += `دخوراکونو شمیر: ${numberOfItems}\nمجموعه نرخ: $${cartTotal}\n`;

    // Add name, address, and phone number to the message
    message += `نوم: ${name}\nادرس: ${address}\nدتماس شمیره: ${phoneNumber}`;

    Toast.show({
      type: 'successy',
      text1: 'ارډر',
      text2: 'په بریا سره ارډر واستول سو',
    });
    navigation.navigate('OrderPreparing');
    return message;
  };
  const statusBarStyle = activeTheme === 'light' ? 'dark' : 'light';
  const { width, height } = useWindowDimensions();

  return (
    <BackgroundImage>
      <ExpoStatusBar style={statusBarStyle} />
      <View style={{ flex: 1, backgroundColor: colors.screenBackground }}>
        <View
          style={{
            paddingTop: StatusBar.currentHeight + vs(10),

            alignItems: 'center',
            flex: 1,
          }}>
          <Form
            nameError={nameError}
            phoneNumberError={phoneNumberError}
            addressError={addressError}
            handleNameChange={handleNameChange}
            handleAddressChange={handleAddressChange}
            handlePhoneNumberChange={handlePhoneNumberChange}
            name={name}
            address={address}
            phoneNumber={phoneNumber}
            handleSubmit={handleSubmit}
          />
        </View>
      </View>
    </BackgroundImage>
  );
}
