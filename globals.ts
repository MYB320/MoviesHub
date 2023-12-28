import { Dimensions } from 'react-native'

export const width = Dimensions.get('window').width
export const height = Dimensions.get('window').height

export const container_width = width * 0.7
export const container_space = (width - container_width) / 2
export const space = 12
export const backdrop_height = height * 0.8
export const item_height = container_width * 1.2
