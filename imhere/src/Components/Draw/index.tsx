import React, { useState } from "react";
import { View , ImageBackground , TouchableOpacity, Text } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { Canvas, Path , useImage, Skia } from "@shopify/react-native-skia";
import { styles } from "./styles";

interface IPath {
  segments: String[];
  color?: string;
}

interface Cordenates {
  xCoord: number[];
  yCoord: number[];
}

export default function Draw() {

  // Canva states

  const [paths, setPaths] = useState<IPath[]>([]);
  const image = require('../../../assets/eu.jpg')

  // Outline detector states
  const [tGestureStart, setTGestureStart] = useState<undefined | string>();
  const [tGestureMove, setTGestureMove] = useState<undefined | string>();
  const [tGestureUpdate, setTGestureUpdate] = useState<undefined | string>();
  const [tGestureEnd, setTGestureEnd] = useState<undefined | string>();

  const [coordenates, setCoordenates] = useState<{id?: number , xcord: number; ycord: number}[]>([]);

  

  // Draw functionality
  const pan = Gesture.Pan()
    .onStart((g) => {
      const newPaths = [...paths];
      newPaths[paths.length] = {
        segments: [],
        color: "#06d6a0",
      };
      newPaths[paths.length].segments.push(`M ${g.x} ${g.y}`);
      setPaths(newPaths);
      setTGestureStart(`${Math.round(g.x)}, ${Math.round(g.y)}`);
      const newCoordenates = [...coordenates, {xcord: g.x , ycord: g.y }];
      setCoordenates(newCoordenates);
    })
    .onTouchesMove((g) => {
   
      setTGestureMove(
        `${Math.round(g.changedTouches[0].x)}, ${Math.round(
          g.changedTouches[0].y
        )}`
      );
    })
    .onUpdate((g) => {
      const index = paths.length - 1;
      const newPaths = [...paths];
      setTGestureUpdate(`${Math.round(g.x)}, ${Math.round(g.y)}`);
      if (newPaths?.[index]?.segments) {
        newPaths[index].segments.push(`L ${g.x} ${g.y}`);
        setPaths(newPaths);
        const newCoordenates = [...coordenates, {xcord: g.x , ycord: g.y }];
        setCoordenates(newCoordenates);
      }
    })
    .onEnd((g) => {
      setTGestureEnd(`${Math.round(g.x)}, ${Math.round(g.y)}`);
      console.log("Coordenadas capturadas" , coordenates)

      // Gets the first and last points at the coordenates array
      const lastCord = coordenates.at(-1); 
      const firstCord = coordenates.at(0);

      // Gets the absolute value of the distance between the x and y coordenates of the points
      const xdist = Math.abs(lastCord?.xcord - firstCord?.xcord);
      const ydist = Math.abs(lastCord?.ycord - firstCord?.ycord);

      //Calculates the distance between the points 
      const dist = Math.hypot(xdist, ydist);

      if(dist < 50)
      {
        console.log("OH MYYYYYYYYYYYYYYYYY GODNESSSS")
      }
    })
    .minDistance(1);

    // Clean Paths state

    function handleErase() {
      
            console.log("Apapagou?")
            setPaths([])
            
    }

    // Outline detector functionality

    
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
          <View>
        <Text
            style={{ color: "white", fontSize: 24 }}
          >{`Gesture started at:  ${tGestureStart}`}</Text>
          <Text
            style={{ color: "white", fontSize: 24 }}
          >{`Gesture ended at:  ${tGestureEnd}`}</Text>
        </View>
          <TouchableOpacity onPress={handleErase} style={styles.eraseButton}>
            <Text style={styles.eraseButtonText}>Apagar</Text>
          </TouchableOpacity>
        </ImageBackground>
       
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

