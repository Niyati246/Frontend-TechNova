import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ChatScreen() {
  // Get params from navigation
  const { mentorName } = useLocalSearchParams<{ mentorName?: string }>();

  return (
    <View style={styles.container}>
      {/* Top Back Button */}
      <View style={styles.header}>
        {/*
          This is the only line that has been changed.
          The TouchableOpacity is now imported from "react-native".
        */}
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#333" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>
          Chat with {mentorName ?? "Mentor"}
        </Text>
      </View>

      {/* Chat Body Placeholder */}
      <View style={styles.chatContainer}>
        <Text style={styles.placeholder}>
          Messages with {mentorName ?? "this mentor"} will appear here.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  backButton: { flexDirection: "row", alignItems: "center", marginRight: 10 },
  backText: { marginLeft: 5, fontSize: 16, color: "#333" },
  title: { fontSize: 20, fontWeight: "bold", flex: 1 },
  chatContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  placeholder: { fontSize: 16, color: "#666", textAlign: "center", padding: 20 },
});