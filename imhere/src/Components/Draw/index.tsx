import React, { useState } from "react";
import { View , ImageBackground , TouchableOpacity, Text } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Canvas, Path , useImage } from "@shopify/react-native-skia";
import { styles } from "./styles";

interface IPath {
  segments: String[];
  color?: string;
}

export default function Draw() {
  const [paths, setPaths] = useState<IPath[]>([]);
  const image = require('../../../assets/eu.jpg')

  const pan = Gesture.Pan()
    .onStart((g) => {
      const newPaths = [...paths];
      newPaths[paths.length] = {
        segments: [],
        color: "#06d6a0",
      };
      newPaths[paths.length].segments.push(`M ${g.x} ${g.y}`);
      setPaths(newPaths);
    })
    .onUpdate((g) => {
      const index = paths.length - 1;
      const newPaths = [...paths];
      if (newPaths?.[index]?.segments) {
        newPaths[index].segments.push(`L ${g.x} ${g.y}`);
        setPaths(newPaths);
      }
    })
    .minDistance(1);

    // Clean Paths state

    function handleErase() {
      
            console.log("Apapagou?")
            setPaths([])
    }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GestureDetector gesture={pan}>
        <ImageBackground source= {image} style={{ flex: 1 }}>
          <Canvas style={{ flex: 8 }}>
            {paths.map((p, index) => (
              <Path
                key={index}
                path={p.segments.join(" ")}
                strokeWidth={5}
                style="stroke"
                color={p.color}
              />
            ))}
          </Canvas>
          <TouchableOpacity onPress={handleErase} style={styles.eraseButton}>
            <Text style={styles.eraseButtonText}>Apagar</Text>
          </TouchableOpacity>
        </ImageBackground>
      </GestureDetector>
    </GestureHandlerRootView>
  );
}