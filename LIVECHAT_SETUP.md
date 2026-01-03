# Live Chat Setup Instructions

Your website now includes a live chat widget integration using Tawk.to, a free live chat service.

## How to Activate Live Chat

1. **Create a Free Tawk.to Account**
   - Go to https://www.tawk.to/
   - Click "Sign Up Free"
   - Create your account

2. **Get Your Property ID**
   - After signing up, log in to your Tawk.to dashboard
   - Click on "Administration" → "Property Settings"
   - You'll see your Property ID and Widget ID in the format:
     ```
     https://embed.tawk.to/YOUR_PROPERTY_ID/YOUR_WIDGET_ID
     ```

3. **Update the LiveChat Component**
   - Open `client/src/components/LiveChat.tsx`
   - Replace `YOUR_PROPERTY_ID` and `YOUR_WIDGET_ID` with your actual IDs from Tawk.to
   - Save the file

4. **Customize Your Chat Widget** (Optional)
   - In your Tawk.to dashboard, you can:
     - Customize the chat bubble color and position
     - Set up automated greetings
     - Configure offline messages
     - Add multiple agents
     - Set business hours
     - Integrate with mobile apps

5. **Republish Your Website**
   - After updating the Property ID, create a new checkpoint
   - Click the Publish button in the Management UI
   - Your live chat will now be active on your published site

## Features

- **Free Forever**: Tawk.to is completely free with unlimited agents and chats
- **Real-time Chat**: Instant messaging with website visitors
- **Mobile Apps**: iOS and Android apps to chat on the go
- **Visitor Monitoring**: See who's on your website in real-time
- **Chat History**: All conversations are saved
- **File Sharing**: Share documents and images with clients
- **Multilingual**: Supports 45+ languages (perfect for Spanish and Portuguese clients)

## Alternative: Remove Live Chat

If you don't want to use live chat, simply:
1. Open `client/src/App.tsx`
2. Remove the line `import LiveChat from "./components/LiveChat";`
3. Remove the line `<LiveChat />` from the App component
4. Save and republish

## Support

For Tawk.to support and documentation, visit: https://help.tawk.to/
