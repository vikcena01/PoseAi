import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

interface PoseSilhouetteProps {
  width?: number;
  height?: number;
  color?: string;
  opacity?: number;
}

export const PoseSilhouette: React.FC<PoseSilhouetteProps> = ({
  width = 200,
  height = 400,
  color = '#FFFFFF',
  opacity = 0.5,
}) => {
  return (
    <View style={[styles.container, { width, height }]}>
      <Svg width={width} height={height} viewBox="0 0 200 400">
        {/* Head */}
        <Circle cx="100" cy="50" r="30" fill={color} opacity={opacity} />
        
        {/* Body */}
        <Path
          d="M100,80 L100,220"
          stroke={color}
          strokeWidth="5"
          opacity={opacity}
        />
        
        {/* Arms */}
        <Path
          d="M100,100 L50,150 M100,100 L150,150"
          stroke={color}
          strokeWidth="5"
          opacity={opacity}
        />
        
        {/* Legs */}
        <Path
          d="M100,220 L70,320 M100,220 L130,320"
          stroke={color}
          strokeWidth="5"
          opacity={opacity}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PoseSilhouette;