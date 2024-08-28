import axios from 'axios';

const BOT_API_TOKEN = '7152603173:AAEd4pDD2s1XBuOpbgGmFQxuhljX3crw0Hc';

const sendMessageToTelegram = async (message, chatId) => {
  try {
    const response = await axios.post(`https://api.telegram.org/bot${BOT_API_TOKEN}/sendMessage`, {
      chat_id: chatId,
      text: message,
    });
    console.log('Message sent:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export { sendMessageToTelegram };
