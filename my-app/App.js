import Toast from 'react-native-toast-message';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { View, Text, I18nManager } from 'react-native';
import { SearchHistoryProvider } from './searchHistoryContext';
import { ThemeProvider } from './ThemeContext'; // Import the ThemeProvider
import Navigation from './navigation';
import BackgroundImage from './components/BackgroundImage';

export default function App() {
  // const toastConfig = {
  //   errory: ({ text1, text2 }) => (
  //     <View style={{ paddingHorizontal: 10, width: '100%' }}>
  //       <View
  //         style={{
  //           height: 60,
  //           width: '100%',
  //           backgroundColor: 'rgba(255,255,255,0.6)',
  //           borderRadius: 10,
  //           padding: 10,
  //         }}>
  //         <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'red' }}>
  //           {text1}
  //         </Text>
  //         <Text style={{ fontSize: 12 }}>{text2}</Text>
  //       </View>
  //     </View>
  //   ),
  //   successy: ({ text1, text2 }) => (
  //     <View style={{ paddingHorizontal: 10, width: '100%' }}>
  //       <View
  //         style={{
  //           height: 60,
  //           width: '100%',
  //           backgroundColor: 'rgba(255,255,255,0.6)',
  //           borderRadius: 10,
  //           padding: 10,
  //         }}>
  //         <Text
  //           style={{ fontSize: 16, fontWeight: 'bold', color: 'darkgreen' }}>
  //           {text1}
  //         </Text>
  //         <Text style={{ fontSize: 12 }}>{text2}</Text>
  //       </View>
  //     </View>
  //   ),
  // };
  useEffect(() => {
    I18nManager.forceRTL(true);
  }, []);

  return (
    <>
      <Provider store={store}>
        <SearchHistoryProvider>
          <ThemeProvider>
            <BackgroundImage>
              <Navigation />
            </BackgroundImage>
          </ThemeProvider>
        </SearchHistoryProvider>
      </Provider>
      {/* <Toast config={toastConfig} /> */}
    </>
  );
}
