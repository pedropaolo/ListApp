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

interface Coordenates {
  segments: Object[]; 
}

export default function Draw() {

  // Get Background Image
  const image = require('../../../assets/eu.jpg')


  const [paths, setPaths] = useState<IPath[]>([]);
  const [coordenates, setCoordenates] = useState<Coordenates[]>([]);

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
      
      const newCoordenates = [...coordenates];
      newCoordenates[coordenates.length] = {
        segments: []
      };
      newCoordenates[paths.length].segments.push({x : g.x , y : g.y });
      setCoordenates(newCoordenates);
    })
    .onUpdate((g) => {
      const index = paths.length - 1;
      const newPaths = [...paths];
      if (newPaths?.[index]?.segments) {
        newPaths[index].segments.push(`L ${g.x} ${g.y}`);
        setPaths(newPaths);
      }
      
      const cordsindex = coordenates.length - 1;
      const newCoordenates = [...coordenates];
        
      if(newCoordenates?.[cordsindex]?.segments) {
        newCoordenates[cordsindex].segments.push({x : g.x , y : g.y });
        setCoordenates(newCoordenates);
      }
      
    })
    .onEnd((g) => {

      // Gets the first and last points at the coordenates array
      const lastCord = coordenates[0].segments[coordenates[0].segments.length - 1];
      const firstCord = coordenates[0].segments[0];

      console.log("CORDENADAS:" , coordenates);
      console.log("PATHS:" , paths)
      console.log("firstCord:" , firstCord , "lastCord:" , lastCord);


      // Gets the absolute value of the distance between the x and y coordenates of the points
      const xdist = firstCord.x - lastCord?.x;
      const ydist = firstCord?.y  - lastCord?.y;
      
      const mxdist = Math.abs(xdist);
      const mydist = Math.abs(ydist);


      // //Calculates the distance between the points 
      const dist = Math.hypot(mxdist, mydist);

      console.log("dist" , dist);

      // Outline autocomplete

      if(dist < 200)
      {
        console.log("OH MYYYYYYYYYYYYYYYYY GODNESSSS")
        const newPaths = [...paths];
        const beggining = newPaths[paths.length - 1].segments[1];
        newPaths[paths.length - 1].segments.push(beggining);
        setPaths(newPaths);
        console.log("path atualizado")
        
      }

      // Erasing bad outlines

      else {
        alert("Você precisa fechar o contono!");
        handleErase();
      }

    })
    .minDistance(1);

    // Clean Paths state

    function handleErase() {

            setPaths([]);
            setCoordenates([]);
            
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
          <View>
        </View>
          <TouchableOpacity onPress={handleErase} style={styles.eraseButton}>
            <Text style={styles.eraseButtonText}>Apagar</Text>
          </TouchableOpacity>
        </ImageBackground>
       
      </GestureDetector>
    </GestureHandlerRootView>
  );
}

