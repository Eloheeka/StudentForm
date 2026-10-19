
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Switch,
  Alert,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';


export default function App() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState('');
  const [gender, setGender] = useState('');
  const [course, setCourse] = useState('');
  const [country, setCountry] = useState('');
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [notifications, setNotifications] = useState(false);
  const [agree, setAgree] = useState(false);
  const [birthDate, setBirthDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [rating, setRating] = useState('5');

  const toggleHobby = (hobby: string) => {
    setHobbies((current) =>
      current.includes(hobby)
        ? current.filter((item) => item !== hobby)
        : [...current, hobby]
    );
  };

  const handleSubmit = () => {
    if (!name || !email || !password || !age || !gender || !course) {
      Alert.alert('Error', 'Please complete all required fields.');
      return;
    }

    if (!agree) {
      Alert.alert('Error', 'Please accept the terms and conditions.');
      return;
    }

    Alert.alert(
      'Form Submitted',
      `Name: ${name}\nEmail: ${email}\nAge: ${age}\nPhone: ${phone}\nGender: ${gender}\nCourse: ${course}\nCountry: ${country}\nBirth Date: ${birthDate.toLocaleDateString()}\nHobbies: ${hobbies.join(', ')}\nNotifications: ${notifications ? 'Yes' : 'No'}\nRating: ${rating}`
    );
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPassword('');
    setAge('');
    setPhone('');
    setWebsite('');
    setAddress('');
    setGender('');
    setCourse('');
    setCountry('');
    setHobbies([]);
    setNotifications(false);
    setAgree(false);
    setBirthDate(new Date());
    setRating('5');
    setShowDatePicker(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.form}>
        <Text style={styles.title}>STUDENT REGISTRATION FORM</Text>
        <Text style={styles.subtitle}>
          Please fill in your information below
        </Text>

        <Text style={styles.sectionTitle}>Personal Information</Text>

        <Text style={styles.label}>Full Name *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter full name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Email *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Text style={styles.label}>Age *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter age"
          value={age}
          onChangeText={setAge}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter phone number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        <Text style={styles.label}>Website / URL</Text>
        <TextInput
          style={styles.input}
          placeholder="https://example.com"
          value={website}
          onChangeText={setWebsite}
          keyboardType="url"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Address / Comments</Text>
        <TextInput
          style={[styles.input, styles.multiline]}
          placeholder="Enter your address or comments"
          value={address}
          onChangeText={setAddress}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        <Text style={styles.sectionTitle}>Gender *</Text>
        {['Male', 'Female', 'Other'].map((item) => (
          <Pressable
            key={item}
            style={styles.option}
            onPress={() => setGender(item)}
          >
            <Text style={styles.optionText}>
              {gender === item ? '(●)' : '( )'} {item}
            </Text>
          </Pressable>
        ))}

        <Text style={styles.sectionTitle}>Course *</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={course}
            onValueChange={(value) => setCourse(value)}
          >
            <Picker.Item label="Select a course" value="" />
            <Picker.Item label="Computer Science" value="Computer Science" />
            <Picker.Item label="Software Engineering" value="Software Engineering" />
            <Picker.Item label="Mechatronics" value="Mechatronics" />
            <Picker.Item label="Data Science" value="Data Science" />
          </Picker>
        </View>

        <Text style={styles.sectionTitle}>Country</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={country}
            onValueChange={(value) => setCountry(value)}
          >
            <Picker.Item label="Select a country" value="" />
            <Picker.Item label="Rwanda" value="Rwanda" />
            <Picker.Item label="Uganda" value="Uganda" />
            <Picker.Item label="Kenya" value="Kenya" />
            <Picker.Item label="Tanzania" value="Tanzania" />
          </Picker>
        </View>

        <Text style={styles.sectionTitle}>Date of Birth</Text>
        <View style={styles.dateButton}>
          <Button
            title="Choose Date of Birth"
            onPress={() => setShowDatePicker(true)}
          />
        </View>

        

<Text style={styles.sectionTitle}>Date of Birth</Text>

{Platform.OS === 'web' ? (
  <input
    type="date"
    value={
      birthDate.getFullYear() +
      '-' +
      String(birthDate.getMonth() + 1).padStart(2, '0') +
      '-' +
      String(birthDate.getDate()).padStart(2, '0')
    }
    max={new Date().toISOString().split('T')[0]}
    onChange={(event) => {
      if (event.target.value) {
        const [year, month, day] = event.target.value
          .split('-')
          .map(Number);

        setBirthDate(new Date(year, month - 1, day));
      }
    }}
  />
) : (
  <>
    <View style={styles.dateButton}>
      <Button
        title="Choose Date of Birth"
        onPress={() => setShowDatePicker(true)}
      />
    </View>

    {showDatePicker && (
      <DateTimePicker
        value={birthDate}
        mode="date"
        display="default"
        maximumDate={new Date()}
        onChange={(event, selectedDate) => {
          setShowDatePicker(false);

          if (selectedDate) {
            setBirthDate(selectedDate);
          }
        }}
      />
    )}
  </>
)}

<Text style={styles.selectedDate}>
  Selected Date: {birthDate.toLocaleDateString()}
</Text>



        <Text style={styles.selectedDate}>
          Selected Date: {birthDate.toLocaleDateString()}
        </Text>

        <Text style={styles.sectionTitle}>Hobbies</Text>
        {['Reading', 'Football', 'Basketball', 'Coding', 'Music'].map(
          (hobby) => (
            <Pressable
              key={hobby}
              style={styles.option}
              onPress={() => toggleHobby(hobby)}
            >
              <Text style={styles.optionText}>
                {hobbies.includes(hobby) ? '[x]' : '[ ]'} {hobby}
              </Text>
            </Pressable>
          )
        )}

        <Text style={styles.sectionTitle}>Preferences</Text>

        <View style={styles.switchRow}>
          <Text style={styles.optionText}>Receive Notifications</Text>
          <Switch
            value={notifications}
            onValueChange={setNotifications}
          />
        </View>

        <Pressable
          style={styles.option}
          onPress={() => setAgree(!agree)}
        >
          <Text style={styles.optionText}>
            {agree ? '[x]' : '[ ]'} Accept Terms and Conditions *
          </Text>
        </Pressable>

        <Text style={styles.sectionTitle}>Rating</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={rating}
            onValueChange={(value) => setRating(value)}
          >
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="5" value="5" />
          </Picker>
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Submit Form" onPress={handleSubmit} />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Reset Form" onPress={handleReset} color="gray" />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f1f5f9',
  },
  form: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#1e3a8a',
  },
  subtitle: {
    textAlign: 'center',
    color: '#64748b',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 18,
    marginBottom: 10,
    color: '#1e40af',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginTop: 12,
    marginBottom: 6,
    color: '#334155',
  },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 6,
    padding: 12,
    fontSize: 15,
    backgroundColor: '#ffffff',
  },
  multiline: {
    height: 100,
  },
  option: {
    paddingVertical: 9,
  },
  optionText: {
    fontSize: 15,
    color: '#334155',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 6,
    marginBottom: 8,
    overflow: 'hidden',
  },
  dateButton: {
    alignSelf: 'flex-start',
    marginVertical: 8,
  },
  selectedDate: {
    fontSize: 14,
    marginTop: 5,
    color: '#475569',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  buttonContainer: {
    marginTop: 15,
  },
});
