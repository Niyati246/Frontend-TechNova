import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  ScrollView,
  FlatList,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const COLORS = {
  primary: '#7B42F6', // Purple
  secondary: '#A5B5FF', // Lavender
  accent: '#FF6F61', // Coral/Red
  background: '#F9FAFF',
  textDark: '#2D2D2D',
  textLight: '#FFFFFF',
  cardBackground: '#FFFFFF',
  shadowColor: '#000000',
  success: '#4CAF50',
  warning: '#FFC107',
};

type ClassItem = {
  id: string;
  title: string;
  mentor: string;
  time: string;
};

type SkillItem = {
  id: string;
  name: string;
  progress: number;
  icon: string;
};

type SuggestedItem = {
  id: string;
  title: string;
  mentor: string;
  rating: number;
};

const DUMMY_USER = { name: 'Alex' };

const DUMMY_CLASSES: ClassItem[] = [
  { id: '1', title: 'Advanced React Hooks', mentor: 'Jane Doe', time: 'Mon, 3 PM' },
  { id: '2', title: 'Firebase Authentication', mentor: 'John Smith', time: 'Wed, 10 AM' },
  { id: '3', title: 'Intro to TypeScript', mentor: 'Kai Lee', time: 'Fri, 5 PM' },
];

const DUMMY_SKILLS: SkillItem[] = [
  { id: 's1', name: 'React Native', progress: 85, icon: 'logo-react' },
  { id: 's2', name: 'JavaScript', progress: 92, icon: 'logo-javascript' },
  { id: 's3', name: 'UI/UX Design', progress: 55, icon: 'color-palette-outline' },
  { id: 's4', name: 'APIs & REST', progress: 70, icon: 'cloud-download-outline' },
];

const DUMMY_SUGGESTED: SuggestedItem[] = [
  { id: 'sug1', title: 'Optimizing Redux', mentor: 'Sam Wilson', rating: 4.8 },
  { id: 'sug2', title: 'Node.js Security', mentor: 'Pat Chen', rating: 4.5 },
  { id: 'sug3', title: 'Testing with Jest', mentor: 'Jordan Grey', rating: 4.9 },
];

const SkillProgressBox = ({ skill }: { skill: SkillItem }) => (
  <View style={progressStyles.box}>
    <Ionicons name={skill.icon as any} size={30} color={COLORS.primary} />
    <Text style={progressStyles.skillName}>{skill.name}</Text>
    <View style={progressStyles.progressBarContainer}>
      <View style={[progressStyles.progressBar, { width: `${skill.progress}%` }]} />
    </View>
    <Text style={progressStyles.progressText}>{skill.progress}%</Text>
  </View>
);

const progressStyles = StyleSheet.create({
  box: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 18,
    padding: 16,
    marginRight: 16,
    width: width * 0.42,
    shadowColor: COLORS.shadowColor,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },
  skillName: {
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.textDark,
    marginTop: 8,
  },
  progressText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: 6,
  },
  progressBarContainer: {
    height: 8,
    width: '100%',
    backgroundColor: COLORS.background,
    borderRadius: 4,
    marginTop: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: COLORS.success,
    borderRadius: 4,
  },
});

const DashboardScreen = () => {
  const handleMatchTeacher = () => router.push('/(tabs)/MatchScreen');

  const renderUpcomingClass = ({ item }: { item: ClassItem }) => (
    <View style={styles.classItem}>
      <Ionicons name="calendar-outline" size={22} color={COLORS.primary} />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.classTitle}>{item.title}</Text>
        <Text style={styles.classMentor}>with {item.mentor}</Text>
      </View>
      <Text style={styles.classTime}>{item.time}</Text>
    </View>
  );

  const renderSuggestedClass = ({ item }: { item: SuggestedItem }) => (
    <TouchableOpacity style={styles.suggestedCard}>
      <Text style={styles.suggestedTitle}>{item.title}</Text>
      <Text style={styles.suggestedMentor}>Mentor: {item.mentor}</Text>
      <View style={styles.ratingContainer}>
        <Ionicons name="star" size={14} color={COLORS.warning} />
        <Text style={styles.ratingText}>{item.rating}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={COLORS.primary} />

        {/* Solid Top Area */}
        <View style={styles.topArea}>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => console.log('Profile tapped')}
          >
            <Ionicons name="person-circle-outline" size={38} color={COLORS.textLight} />
          </TouchableOpacity>

          <Text style={styles.greeting}>Welcome back, {DUMMY_USER.name} 👋</Text>
          <Text style={styles.greetingSubtitle}>Let’s keep learning today!</Text>
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Match Button */}
          <TouchableOpacity style={styles.matchButton} onPress={handleMatchTeacher}>
            <Ionicons name="heart" size={22} color={COLORS.textLight} />
            <Text style={styles.matchButtonText}>Find Your Perfect Mentor</Text>
          </TouchableOpacity>

          {/* Upcoming */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>📅 Upcoming Classes</Text>
            <View style={styles.card}>
              <FlatList
                data={DUMMY_CLASSES}
                keyExtractor={(item) => item.id}
                renderItem={renderUpcomingClass}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                scrollEnabled={false}
              />
            </View>
          </View>

          {/* Skills */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>🚀 Skill Progress</Text>
            <FlatList
              data={DUMMY_SKILLS}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <SkillProgressBox skill={item} />}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>

          {/* Suggested */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>💡 Suggested Classes</Text>
            <FlatList
              data={DUMMY_SUGGESTED}
              keyExtractor={(item) => item.id}
              renderItem={renderSuggestedClass}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  topArea: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 32,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  profileButton: { position: 'absolute', top: 60, right: 24 },
  greeting: { fontSize: 28, fontWeight: '700', color: COLORS.textLight },
  greetingSubtitle: { fontSize: 15, color: COLORS.textLight, opacity: 0.9, marginTop: 6 },
  scrollContent: { paddingHorizontal: 24, paddingBottom: 40 },

  matchButton: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: COLORS.accent,
  paddingVertical: 16,
  borderRadius: 16,
  marginTop: 20,     // ✅ give space below purple header
  marginBottom: 28,
  shadowColor: COLORS.accent,
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.25,
  shadowRadius: 6,
  elevation: 6,
},
  matchButtonText: {
    color: COLORS.textLight,
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  section: { marginBottom: 28 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: COLORS.textDark, marginBottom: 12 },
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 14,
    shadowColor: COLORS.shadowColor,
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  classItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10 },
  classTitle: { fontSize: 15, fontWeight: '600', color: COLORS.textDark },
  classMentor: { fontSize: 13, color: COLORS.textDark, opacity: 0.7 },
  classTime: { fontSize: 13, fontWeight: '700', color: COLORS.primary },
  separator: { height: 1, backgroundColor: COLORS.background, marginVertical: 6 },
  suggestedCard: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 18,
    padding: 16,
    width: width * 0.48,
    marginRight: 14,
    shadowColor: COLORS.shadowColor,
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 2,
  },
  suggestedTitle: { fontSize: 15, fontWeight: '700', color: COLORS.textDark },
  suggestedMentor: { fontSize: 12, color: COLORS.textDark, opacity: 0.65, marginTop: 4 },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 6 },
  ratingText: { marginLeft: 4, fontSize: 13, fontWeight: '600', color: COLORS.warning },
});

export default DashboardScreen;
