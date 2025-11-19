import React, { useState } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { Surface, TextInput, Button, Title, Caption } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const books = [
  'genesis', 'exodus', 'leviticus', 'numbers', 'deuteronomy',
  'joshua', 'judges', 'ruth', '1samuel', '2samuel',
  '1kings', '2kings', '1chronicles', '2chronicles', 'ezra',
  'nehemiah', 'esther', 'job', 'psalms', 'proverbs',
  'ecclesiastes', 'song of solomon', 'isaiah', 'jeremiah', 'lamentations',
  'ezekiel', 'daniel', 'hosea', 'joel', 'amos',
  'obadiah', 'jonah', 'micah', 'nahum', 'habakkuk',
  'zephaniah', 'haggai', 'zechariah', 'malachi', 'matthew',
  'mark', 'luke', 'john', 'acts', 'romans',
  '1corinthians', '2corinthians', 'galatians', 'ephesians', 'philippians',
  'colossians', '1thessalonians', '2thessalonians', '1timothy', '2timothy',
  'titus', 'philemon', 'hebrews', 'james', '1peter',
  '2peter', '1john', '2john', '3john', 'jude', 'revelation'
];

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [book, setBook] = useState('');
  const [chapter, setChapter] = useState('');

  const handleSearch = () => {
    if (book && chapter) {
      navigation.navigate('Chapter', {
        book: book.toLowerCase(),
        chapter: parseInt(chapter, 10)
      });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.surface}>
        <Title style={styles.title}>Bíblia Sagrada</Title>
        <Caption style={styles.caption}>
          Digite o nome do livro e o capítulo
        </Caption>
        
        <TextInput
          label="Livro (em inglês)"
          value={book}
          onChangeText={setBook}
          style={styles.input}
          mode="outlined"
        />
        
        <TextInput
          label="Capítulo"
          value={chapter}
          onChangeText={setChapter}
          keyboardType="numeric"
          style={styles.input}
          mode="outlined"
        />
        
        <Button 
          mode="contained" 
          onPress={handleSearch}
          style={styles.button}
          disabled={!book || !chapter}>
          Buscar
        </Button>

        <Caption style={styles.caption}>
          Exemplos: genesis 1, john 3, psalms 23
        </Caption>
      </Surface>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  surface: {
    padding: 16,
    elevation: 4,
    borderRadius: 8,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  caption: {
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    paddingVertical: 8,
  },
});

export default HomeScreen;