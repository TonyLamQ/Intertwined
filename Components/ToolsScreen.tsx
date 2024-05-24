import colors from '../utils/colors';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ValutaConverterComponent from './ValutaConverterComponent';

export default function ToolsScreen() {
  return (
      <ScrollView style={styles.scrollView}>
        <ValutaConverterComponent />
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    padding:30,
    backgroundColor: colors.white,
  },
});
