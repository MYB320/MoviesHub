import {
  SafeAreaView,
  StyleSheet,
  Animated,
  View,
  TouchableOpacity,
  TextInput,
  Text,
} from 'react-native'
import { useEffect, useRef, useState } from 'react'
import { container_space, container_width, space } from './globals'
import Backdrop from './components/Backcrop'
import Poster from './components/Poster'
import Infocard from './components/Infocard'
import Ionicons from '@expo/vector-icons/Ionicons'
import { getTrending } from './api'
import { TrendingResult } from './interface/apiresults'

export default function Page() {
  const scrollX = useRef(new Animated.Value(0)).current
  const fadeAnim = useRef(new Animated.Value(0)).current
  const [isVisible, setIsVisible] = useState<Boolean>(false)
  const textInputRef = useRef<TextInput>(null)
  const [data, setData] = useState<TrendingResult>()

  useEffect(() => {
    ;(async () => {
      const trending = await getTrending()
      setData(trending)
    })()
  }, [setData])

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => textInputRef.current?.focus())
  }

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(() => setIsVisible(false))
  }

  const handlePress = () => {
    setIsVisible(!isVisible)

    if (!isVisible) {
      fadeIn()
    } else {
      fadeOut()
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Backdrop scrollX={scrollX} data={data} />
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name='list-sharp' size={24} color='white' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton} onPress={handlePress}>
            <Ionicons name='search-sharp' size={24} color='white' />
          </TouchableOpacity>
        </View>
        {isVisible && (
          <Animated.View
            style={[styles.headerSearchContainer, { opacity: fadeAnim }]}
          >
            <TextInput
              ref={textInputRef}
              placeholder='Search for Movies, Tv Show ...'
            />
          </Animated.View>
        )}
      </View>
      {data && (
        <Animated.FlatList
          data={data?.results}
          horizontal
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: true,
            }
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 140,
            paddingHorizontal: container_space,
          }}
          decelerationRate={0}
          snapToInterval={container_width}
          scrollEventThrottle={16}
          keyExtractor={(item, index) => String(item.id)}
          renderItem={({ item, index }) => (
            <View style={{ gap: space }}>
              <Poster
                item={item.backdrop_path}
                index={index}
                scrollX={scrollX}
              />
              <Infocard item={item} index={index} scrollX={scrollX} />
            </View>
          )}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'whitesmoke',
  },
  header: {
    top: 60,
    zIndex: 100,
    paddingHorizontal: 20,
    gap: space,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  headerButton: {
    elevation: 2,
    backgroundColor: 'transparent',
    alignItems: 'center',
    borderRadius: 100,
    padding: 10,
  },
  headerSearchContainer: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 24,
    elevation: space,
  },
})
