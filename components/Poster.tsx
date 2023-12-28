import { View, Animated, Image, StyleSheet } from 'react-native'
import { container_width, item_height, space } from '../globals'

export default function Poster({
  item,
  index,
  scrollX,
}: {
  item: string
  index: number
  scrollX: Animated.Value
}) {
  const inputRange = [
    (index - 1) * container_width,
    index * container_width,
    (index + 1) * container_width,
  ]
  const scrollY = scrollX.interpolate({
    inputRange,
    outputRange: [0, -50, 0],
  })
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [-container_width * 0.65, 0, container_width * 0.65],
  })
  return (
    <View style={{ width: container_width }}>
      <Animated.View
        style={{
          marginHorizontal: space,
          borderRadius: 34,
          alignItems: 'center',
          borderWidth: 10,
          borderColor: 'white',
          overflow: 'hidden',
          elevation: space,
          transform: [{ translateY: scrollY }],
        }}
      >
        <Animated.Image
          source={{
            uri: `https://image.tmdb.org/t/p/original${item}`,
          }}
          style={[styles.imageContainer, { transform: [{ translateX }] }]}
        />
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    width: container_width * 1.2,
    height: item_height,
    resizeMode: 'cover',
    borderRadius: 24,
    margin: 0,
  },
})
