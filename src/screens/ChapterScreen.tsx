import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Surface, Title, Paragraph, ActivityIndicator, Chip } from 'react-native-paper';
import { RouteProp } from '@react-navigation/native';
import axios from 'axios';
import { RootStackParamList } from '../../App';

type ChapterScreenRouteProp = RouteProp<RootStackParamList, 'Chapter'>;

type Props = {
  route: ChapterScreenRouteProp;
};

type Verse = {
  verse: number;
  text: string;
};

type BibleResponse = {
  reference: string;
  verses: Verse[];
  text: string;
  translation_id: string;
};

const ChapterScreen: React.FC<Props> = ({ route }) => {
  const { book, chapter } = route.params;
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchChapter();
  }, [book, chapter]);

  const fetchChapter = async () => {
    try {
      setLoading(true);
      const response = await axios.get<BibleResponse>(
        `https://bible-api.com/${book}%20${chapter}?translation=almeida`
      );
      setVerses(response.data.verses);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar o capítulo');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Paragraph>{error}</Paragraph>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Surface style={styles.surface}>
        <Chip mode="outlined" style={styles.chip}>
          {book} {chapter}
        </Chip>
        
        {verses.map((verse) => (
          <View key={verse.verse} style={styles.verseContainer}>
            <Paragraph style={styles.verseText}>
              <Paragraph style={styles.verseNumber}>
                {verse.verse}
              </Paragraph>
              {' '}{verse.text}
            </Paragraph>
          </View>
        ))}
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
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chip: {
    alignSelf: 'center',
    marginBottom: 16,
  },
  verseContainer: {
    marginBottom: 12,
  },
  verseNumber: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  verseText: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default ChapterScreen;