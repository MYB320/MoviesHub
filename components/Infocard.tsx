import { View, Animated, Text, StyleSheet } from 'react-native'
import { container_width, space } from '../globals'
import { ResultItem } from '../interface/apiresults'
import Ionicons from '@expo/vector-icons/Ionicons'

export default function Infocard({
  item,
  index,
  scrollX,
}: {
  item: ResultItem
  index: number
  scrollX: Animated.Value
}) {
  const inputRange = [
    (index - 1) * container_width,
    index * container_width,
    (index + 1) * container_width,
  ]
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
  })

  const translateY = scrollX.interpolate({
    inputRange,
    outputRange: [100, 0, 100],
  })
  return (
    <View style={{ width: container_width }}>
      <Animated.View
        style={{
          marginHorizontal: space,
          padding: space,
          borderRadius: 24,
          backgroundColor: 'white',
          alignItems: 'center',
          elevation: space,
          opacity: scale,
          transform: [{ translateY }],
        }}
      >
        <View style={styles.media}>
          <Ionicons
            name={item.media_type === 'movie' ? 'videocam-sharp' : 'tv-sharp'}
            size={18}
            color='white'
          />
        </View>
        <Text style={styles.title}>
          {item.media_type === 'movie' ? item.title : item.name}
        </Text>
        <View>
          <Text>{item.overview}</Text>
        </View>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: '#38434D',
    fontSize: 14,
  },
  media: {
    position: 'absolute',
    top: -20,
    padding: 6,
    right: 15,
    borderRadius: 100,
    backgroundColor: '#6366F1',
  },
})
