const axios = require('axios');

exports.sendtextMessage = async (req, res) => {
  const { token } = req.body; 
  const phoneNumberId = '385774994618021'; 
  const url = `https://graph.facebook.com/v13.0/${phoneNumberId}/messages`;

  try {
    const response = await axios.post(url, {
      messaging_product: 'whatsapp',
      to: '919548144154',  
      text: { body: 'Hello, exciting new opportunity is now available.' }
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return res.status(200).json({
      message: response.data,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
