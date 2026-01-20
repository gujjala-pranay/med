import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

// Import actual assets
import cameraIcon from '../assets/icons/camera.png';
import notificationsIcon from '../assets/icons/notifications.jpg';
import searchIcon from '../assets/icons/search.png';

interface FamilyMember {
  id: string;
  name: string;
  age: number;
  relation: string;
  avatar?: string;
}

interface Prescription {
  id: string;
  memberName: string;
  doctorName: string;
  date: string;
  diagnosis: string;
  medicines: number;
}

interface Reminder {
  id: string;
  medicineName: string;
  memberName: string;
  time: string;
  taken: boolean;
}

export default function DashboardScreen() {
  const [selectedMember, setSelectedMember] = useState('all');

  // Mock data - in real app, this would come from API
  const familyMembers: FamilyMember[] = [
    { id: '1', name: 'John Doe', age: 35, relation: 'Self' },
    { id: '2', name: 'Jane Doe', age: 32, relation: 'Spouse' },
    { id: '3', name: 'Tommy Doe', age: 8, relation: 'Son' },
    { id: '4', name: 'Emma Doe', age: 5, relation: 'Daughter' },
  ];

  const recentPrescriptions: Prescription[] = [
    {
      id: '1',
      memberName: 'John Doe',
      doctorName: 'Dr. Smith',
      date: '2025-01-15',
      diagnosis: 'Hypertension',
      medicines: 3,
    },
    {
      id: '2',
      memberName: 'Tommy Doe',
      doctorName: 'Dr. Johnson',
      date: '2025-01-12',
      diagnosis: 'Common Cold',
      medicines: 2,
    },
  ];

  const todayReminders: Reminder[] = [
    {
      id: '1',
      medicineName: 'Amoxicillin',
      memberName: 'Tommy Doe',
      time: '08:00 AM',
      taken: true,
    },
    {
      id: '2',
      medicineName: 'Paracetamol',
      memberName: 'Tommy Doe',
      time: '02:00 PM',
      taken: false,
    },
    {
      id: '3',
      medicineName: 'Lisinopril',
      memberName: 'John Doe',
      time: '09:00 AM',
      taken: true,
    },
  ];

  const handleUploadPress = () => {
    router.push('/(tabs)/upload');
  };

  const handleSearchPress = () => {
    router.push('/(tabs)/search');
  };

  const handleRemindersPress = () => {
    router.push('/(tabs)/reminders');
  };

  const handleAIChatPress = () => {
    // In real app, this would navigate to AIChatScreen
    console.log('Navigate to AI chat');
  };

  const handleFamilyPress = () => {
    router.push('/(tabs)/family');
  };

  const renderFamilyMember = ({ item }: { item: FamilyMember }) => (
    <Pressable
      style={[
        styles.memberCard,
        selectedMember === item.id && styles.memberCardSelected
      ]}
      onPress={() => setSelectedMember(item.id)}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {item.name.split(' ').map(n => n[0]).join('')}
        </Text>
      </View>
      <Text style={styles.memberName}>{item.name}</Text>
      <Text style={styles.memberRelation}>{item.relation}</Text>
    </Pressable>
  );

  const renderPrescription = ({ item }: { item: Prescription }) => (
    <View style={styles.prescriptionCard}>
      <View style={styles.prescriptionHeader}>
        <Text style={styles.memberName}>{item.memberName}</Text>
        <Text style={styles.prescriptionDate}>{item.date}</Text>
      </View>
      <Text style={styles.doctorName}>{item.doctorName}</Text>
      <Text style={styles.diagnosis}>{item.diagnosis}</Text>
      <View style={styles.medicineInfo}>
        <Text style={styles.medicineCount}>{item.medicines} medicines</Text>
      </View>
    </View>
  );

  const renderReminder = ({ item }: { item: Reminder }) => (
    <View style={[
      styles.reminderCard,
      item.taken && styles.reminderTaken
    ]}>
      <View style={styles.reminderTime}>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
      <View style={styles.reminderDetails}>
        <Text style={styles.medicineName}>{item.medicineName}</Text>
        <Text style={styles.memberName}>{item.memberName}</Text>
      </View>
      <View style={[
        styles.statusBadge,
        item.taken ? styles.statusTaken : styles.statusPending
      ]}>
        <Text style={[
          styles.statusText,
          item.taken ? styles.statusTextTaken : styles.statusTextPending
        ]}>
          {item.taken ? 'Taken' : 'Pending'}
        </Text>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Good Morning!</Text>
        <Text style={styles.subtitle}>Manage your family's health</Text>
      </View>

      {/* Family Members */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Family Members</Text>
          <Pressable onPress={handleFamilyPress}>
            <Text style={styles.viewAllText}>View All</Text>
          </Pressable>
        </View>
        <FlatList
          data={familyMembers}
          renderItem={renderFamilyMember}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.membersList}
        />
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsGrid}>
          <Pressable style={styles.actionCard} onPress={handleUploadPress}>
            <Image source={cameraIcon} style={styles.actionIcon} />
            <Text style={styles.actionTitle}>Upload</Text>
            <Text style={styles.actionSubtitle}>Add prescription</Text>
          </Pressable>
          <Pressable style={styles.actionCard} onPress={handleSearchPress}>
            <Image source={searchIcon} style={styles.actionIcon} />
            <Text style={styles.actionTitle}>Search</Text>
            <Text style={styles.actionSubtitle}>Find medicines</Text>
          </Pressable>
          <Pressable style={styles.actionCard} onPress={handleRemindersPress}>
            <Image source={notificationsIcon} style={styles.actionIcon} />
            <Text style={styles.actionTitle}>Reminders</Text>
            <Text style={styles.actionSubtitle}>Manage doses</Text>
          </Pressable>
          <Pressable style={styles.actionCard} onPress={handleAIChatPress}>
            <Text style={styles.actionIcon}>💬</Text>
            <Text style={styles.actionTitle}>AI Chat</Text>
            <Text style={styles.actionSubtitle}>Get help</Text>
          </Pressable>
        </View>
      </View>

      {/* Today's Reminders */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Today's Reminders</Text>
        <FlatList
          data={todayReminders}
          renderItem={renderReminder}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </View>

      {/* Recent Prescriptions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Prescriptions</Text>
        <FlatList
          data={recentPrescriptions}
          renderItem={renderPrescription}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
  },
  viewAllText: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '600',
  },
  membersList: {
    paddingRight: 16,
  },
  memberCard: {
    alignItems: 'center',
    marginRight: 16,
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  memberCardSelected: {
    borderColor: '#2563EB',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  memberName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
  },
  memberRelation: {
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'center',
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  actionIcon: {
    width: 24,
    height: 24,
    marginBottom: 8,
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  reminderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  reminderTaken: {
    backgroundColor: '#F0FDF4',
  },
  reminderTime: {
    width: 60,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  reminderDetails: {
    flex: 1,
    marginLeft: 12,
  },
  medicineName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusTaken: {
    backgroundColor: '#10B981',
  },
  statusPending: {
    backgroundColor: '#F59E0B',
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  statusTextTaken: {
    color: '#FFFFFF',
  },
  statusTextPending: {
    color: '#FFFFFF',
  },
  prescriptionCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  prescriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  prescriptionDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  doctorName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2563EB',
    marginBottom: 4,
  },
  diagnosis: {
    fontSize: 14,
    color: '#1F2937',
    marginBottom: 8,
  },
  medicineInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  medicineCount: {
    fontSize: 12,
    color: '#6B7280',
  },
});
