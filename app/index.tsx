import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import ConvAiDOMComponent from "./components/ConvAI";
import tools from "./utils/tools";

export default function App() {
  const [messages, setMessages] = useState<
    { message: string; source: string }[]
  >([]);

  const handleMessage = (newMessage: { message: string; source: string }) => {
    // console.log("newMessage", newMessage);
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#0F172A", "#1E293B"]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>EchoTalk AI</Text>
        <Text style={styles.subHeaderText}>Conversational Speech AI</Text>
      </View>

      <View style={styles.domComponentContainer}>
        <ConvAiDOMComponent
          dom={{ style: styles.domComponent }}
          platform={Platform.OS}
          get_battery_level={tools.get_battery_level}
          change_brightness={tools.change_brightness}
          flash_screen={tools.flash_screen}
          onMessage={handleMessage} // ✅ add onMessage capture
        />
      </View>

      {/* Conversation Messages */}
      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={{ paddingVertical: 10 }}
      >
        {messages.map((msg, idx) => (
          <View
            key={idx}
            style={[
              styles.messageBubble,
              msg.source === "user" ? styles.userBubble : styles.aiBubble,
            ]}
          >
            <Text
              style={[
                styles.messageText,
                msg.source === "user" ? styles.userText : styles.aiText,
              ]}
            >
              {msg.source === "user" ? "🧑 : " : "🤖 : "}
              {msg.message}
            </Text>
          </View>
        ))}
      </ScrollView>
      {/* <ScrollView style={styles.messagesContainer}>
        {messages.map((msg, idx) => (
          <View key={idx} style={styles.messageBubble}>
            <Text style={styles.messageText}>{msg.message}</Text>
          </View>
        ))}
      </ScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContent: {
    paddingTop: 40,
    paddingHorizontal: 24,
    alignItems: "center",
    flex: 1,
  },
  header: {
    paddingTop: 40,
    paddingBottom: 16,
    paddingHorizontal: 20,
    alignItems: "center",
    backgroundColor: "#1E293B",
    borderBottomWidth: 1,
    borderBottomColor: "#334155",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#E2E8F0",
  },
  subHeaderText: {
    fontSize: 14,
    color: "#94A3B8",
    marginTop: 4,
  },
  description: {
    fontFamily: "Inter-Regular",
    fontSize: 16,
    color: "#E2E8F0",
    textAlign: "center",
    maxWidth: 300,
    lineHeight: 24,
    marginBottom: 24,
  },
  domComponentContainer: {
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    marginBottom: 24,
    marginTop: 40,
  },
  domComponent: {
    width: 120,
    height: 120,
  },

  // messageBubble: {
  //   backgroundColor: "#FFFFFF", // white background
  //   padding: 12,
  //   marginVertical: 4,
  //   marginHorizontal: 12,
  //   borderRadius: 8,
  // },
  // messageText: {
  //   color: "#000000", // black text
  //   fontSize: 16,
  //   fontFamily: "Inter-Regular",
  // },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 12,
  },
  messageBubble: {
    maxWidth: "75%",
    padding: 12,
    marginVertical: 6,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  aiBubble: {
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
    borderTopLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: "#2563EB",
    alignSelf: "flex-end",
    borderTopRightRadius: 4,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  aiText: {
    color: "#0F172A",
  },
  userText: {
    color: "#FFFFFF",
  },
  inputContainer: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    borderTopWidth: 1,
    borderTopColor: "#334155",
  },
});
