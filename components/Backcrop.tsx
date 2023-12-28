import { LinearGradient } from 'expo-linear-gradient'
import { Animated, View, StyleSheet } from 'react-native'
import { backdrop_height, width, container_width } from '../globals'
import { TrendingResult } from '../interface/apiresults'

export default function Backdrop({
  scrollX,
  data,
}: {
  data: TrendingResult | undefined
  scrollX: Animated.Value
}) {
  return (
    <View
      style={[
        {
          position: 'absolute',
          height: backdrop_height,
          top: 0,
          width: width,
        },
        StyleSheet.absoluteFillObject,
      ]}
    >
      {data &&
        data.results.map((item, index) => {
          const inputRange = [
            (index - 1) * container_width,
            index * container_width,
            (index + 1) * container_width,
          ]

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          })
          return (
            <Animated.Image
              key={index}
              source={{
                uri: `https://image.tmdb.org/t/p/original${item.poster_path}`,
              }}
              style={[
                { width: width, height: backdrop_height, opacity },
                StyleSheet.absoluteFillObject,
              ]}
            />
          )
        })}
      <LinearGradient
        colors={['transparent', 'whitesmoke']}
        style={{
          width,
          height: backdrop_height,
          position: 'absolute',
          bottom: 0,
        }}
      />
    </View>
  )
}
