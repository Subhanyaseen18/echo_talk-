"use dom";

import { useConversation } from "@elevenlabs/react";
import { Mic } from "lucide-react-native";
import { useCallback } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import tools from "../utils/tools";

// Request microphone permission (web context)
async function requestMicrophonePermission() {
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true });
    return true;
  } catch (error) {
    console.log(error);
    console.error("Microphone permission denied");
    return false;
  }
}

export default function ConvAiDOMComponent({
  platform,
  get_battery_level,
  change_brightness,
  flash_screen,
  onMessage, // ✅ add this prop
}: {
  dom?: import("expo/dom").DOMProps;
  platform: string;
  get_battery_level: typeof tools.get_battery_level;
  change_brightness: typeof tools.change_brightness;
  flash_screen: typeof tools.flash_screen;
  onMessage?: (msg: { message: string; source: string }) => void; // ✅ type
}) {
  const conversation = useConversation({
    onConnect: () => console.log("Connected"),
    onDisconnect: () => console.log("Disconnected"),
    onMessage: (message) => {
      console.log(message);
      onMessage?.(message); // ✅ forward to App for display
    },
    onError: (error) => console.error("Error:", error),
  });

  const startConversation = useCallback(async () => {
    try {
      const hasPermission = await requestMicrophonePermission();
      if (!hasPermission) {
        alert("Microphone permission not granted.");
        return;
      }

      await conversation.startSession({
        agentId: "agent_2601k0vrmzzqfs5b060gjqdc4qp2", // replace with your actual agent ID
        dynamicVariables: {
          platform,
        },
        clientTools: {
          get_battery_level,
          change_brightness,
          flash_screen,
        },
      });
    } catch (error) {
      console.error("Failed to start conversation:", error);
    }
  }, [conversation]);

  const stopConversation = useCallback(async () => {
    await conversation.endSession();
  }, [conversation]);

  return (
    <Pressable
      style={[
        styles.callButton,
        conversation.status === "connected" && styles.callButtonActive,
      ]}
      onPress={
        conversation.status === "disconnected"
          ? startConversation
          : stopConversation
      }
    >
      <View
        style={[
          styles.buttonInner,
          conversation.status === "connected" && styles.buttonInnerActive,
        ]}
      >
        <Mic
          size={32}
          color="#E2E8F0"
          strokeWidth={1.5}
          style={styles.buttonIcon}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  callButton: {
    width: 125,
    height: 125,
    borderRadius: 60,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  callButtonActive: {
    backgroundColor: "rgba(239, 68, 68, 0.2)",
  },
  buttonInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#3B82F6",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#3B82F6",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 5,
  },
  buttonInnerActive: {
    backgroundColor: "#EF4444",
    shadowColor: "#EF4444",
  },
  buttonIcon: {
    transform: [{ translateY: 2 }],
  },
});
