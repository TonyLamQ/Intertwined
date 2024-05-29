import colors from '../utils/colors';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import ValutaConverterComponent from '../Shared/ValutaConverterComponent';
import BudgetTrackerComponent from '../Shared/BudgetTrackerComponent';
import WeatherComponent from '../Shared/WeatherComponent';
import ImportantDocuments from '../Shared/ImportantDocuments';

export default function ToolsScreen() {
  return (
      <ScrollView style={styles.scrollView}>
        <ValutaConverterComponent />
        <BudgetTrackerComponent />	
        <WeatherComponent />
        <ImportantDocuments />
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    padding:30,
    gap: 20,
    backgroundColor: colors.white,
  }
});
