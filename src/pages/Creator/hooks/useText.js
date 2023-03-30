import React from 'react'
import { fabric } from "fabric";
import FontFaceObserver from "fontfaceobserver";

export default function useText(fabricRef, props) {

    const typePlace = () => {
        if (props.place) {
          if (fabricRef.current && props.place === "") {
            fabricRef.current._objects.forEach((image, i) => {
              if (fabricRef.current.item(i).className === "typePlace") {
                fabricRef.current.remove(fabricRef.current.item(i));
              }
            });
          }
    
          fabricRef.current._objects.forEach((image, i) => {
            if (fabricRef.current.item(i).className === "typePlace") {
              fabricRef.current.remove(fabricRef.current.item(i));
            }
          });
    
          const font = new FontFaceObserver(props.coords.typePlace.FontFamily);
          
            font.load().then(() => {
          const typePlace = new fabric.Text(props.place, {
            selectable: false,
            charSpacing: props.coords.typePlace.CharSpacing,
            textAlign: "center",
            top: props.coords.typePlace.Top,
            left: props.coords.typePlace.Left,
            className: "typePlace",
            fontSize: props.coords.typePlace.FontSize,
            fill: props.coords.typePlace.Fill,
            originX: props.coords.typePlace.OriginX,
            originY: props.coords.typePlace.OriginY,
            fontFamily: props.coords.typePlace.FontFamily,
          });
          
    
          if (typePlace.width >= props.coords.typePlace.ScaleToWidth) {
            typePlace.scaleToWidth(props.coords.typePlace.ScaleToWidth);
          }
          if (props.themeOption) {
            if (
              props.themeOption.label.split("-")[0] === "biało" ||
              props.themeOption.label.split("-")[0] === "żółto" ||
              props.themeOption.label === "biały"
            ) {
              typePlace.set({
                fill: "black",
              });
            } else {
              typePlace.set({
                fill: props.coords.typePlace.Fill,
              });
            }
            if (
              props.id.theme === "motyw 2" &&
              props.themeOption.label === "żółto-czarny"
            ) {
              typePlace.set({
                fill: "white",
              });
            }
            if (props.id.theme === "motyw 3") {
              typePlace.set({
                fill: "white",
              });
            }
            if (
              props.id.theme === "motyw 4" &&
              props.themeOption.label === "żółto-czarny"
            ) {
              typePlace.set({
                fill: "white",
              });
            }
            if (
              props.id.theme === "motyw 4" &&
              props.themeOption.label === "czarno-biały"
            ) {
              typePlace.set({
                fill: "black",
              });
            }
            if (
              props.id.theme === "motyw 4" &&
              props.themeOption.label === "niebieski"
            ) {
              typePlace.set({
                fill: "black",
              });
            }
            if (
              props.id.theme === "motyw 4" &&
              props.themeOption.label === "zielony"
            ) {
              typePlace.set({
                fill: "black",
              });
            }
            if (
              props.id.theme === "motyw 4" &&
              props.themeOption.label === "biało-niebieski"
            ) {
              typePlace.set({
                fill: "white",
              });
            }
            if (
              props.id.theme === "motyw 5" &&
              (props.themeOption.label === "żółto-czarny" ||
                props.themeOption.label === "biało-niebieski")
            ) {
              typePlace.set({
                fill: "white",
              });
            }
          }
          fabricRef.current.add(typePlace);
        });
        }
      };
      const typeDate = () => {
        
        if (fabricRef.current && props.date === "") {
          fabricRef.current._objects.forEach((image, i) => {
            if (fabricRef.current.item(i).className === "typeDate") {
              fabricRef.current.remove(fabricRef.current.item(i));
            }
          });
        }
        
        if (props.date) {
          fabricRef.current._objects.forEach((image, i) => {
            if (fabricRef.current.item(i).className === "typeDate") {
              fabricRef.current.remove(fabricRef.current.item(i));
            }
          });
          
          const font = new FontFaceObserver(props.coords.typeData.FontFamily);
          font.load().then(() => {
          const typeDate = new fabric.Text(props.date, {
            selectable: false,
            top: props.coords.typeData.Top,
            left: props.coords.typeData.Left,
            className: "typeDate",
            fontSize: props.coords.typeData.FontSize,
            fill: props.coords.typeData.Fill,
            originX: props.coords.typeData.OriginX,
            originY: props.coords.typeData.OriginY,
            fontFamily: props.coords.typeData.FontFamily,
            charSpacing: props.coords.typeData.CharSpacing,
          });      
          if (typeDate.width >= props.coords.typeData.ScaleToWidth) {
            typeDate.scaleToWidth(props.coords.typeData.ScaleToWidth);
            }
          
          if (props.themeOption) {
            if (
              props.themeOption.label.split("-")[0] === "biało" ||
              props.themeOption.label.split("-")[0] === "żółto" ||
              props.themeOption.label === "biały"
            ) {
              typeDate.set({
                fill: "black",
              });
            } else {
              typeDate.set({
                fill: props.coords.typeData.Fill,
              });
            }
            if (
              props.id.theme === "motyw 2" &&
              props.themeOption.label === "żółto-czarny"
            ) {
              typeDate.set({
                fill: "white",
              });
            }
            if (props.id.theme === "motyw 3") {
              typeDate.set({
                fill: "white",
              });
            }
    
            if (
              props.id.theme === "motyw 4" &&
              props.themeOption.label === "żółto-czarny"
            ) {
              typeDate.set({
                fill: "white",
              });
            }
            if (
              props.id.theme === "motyw 4" &&
              props.themeOption.label === "czarno-biały"
            ) {
              typeDate.set({
                fill: "black",
              });
            }
            if (
              props.id.theme === "motyw 4" &&
              props.themeOption.label === "niebieski"
            ) {
              typeDate.set({
                fill: "black",
              });
            }
            if (
              props.id.theme === "motyw 4" &&
              props.themeOption.label === "zielony"
            ) {
              typeDate.set({
                fill: "black",
              });
            }
            if (
              props.id.theme === "motyw 4" &&
              props.themeOption.label === "biało-niebieski"
            ) {
              typeDate.set({
                fill: "white",
              });
            }
          } 
            fabricRef.current.add(typeDate);
            fabricRef.current.renderAll();
        });
        }
      };
      const yourKolejka = () => {
    
        if (props.kolejka) {
          
          fabricRef.current._objects.forEach((image, i) => {
            if (fabricRef.current.item(i).className === "yourKolejka") {
              fabricRef.current.remove(fabricRef.current.item(i));
            }
          });
          const font = new FontFaceObserver(props.coords.yourKolejka.FontFamily);
          font.load().then(() => {
            
            const yourKolejka = new fabric.Text(props.kolejka, {
              top: props.coords.yourKolejka.Top,
              left: props.coords.yourKolejka.Left,
              fontFamily: props.coords.yourKolejka.FontFamily,
              selectable: false,
              fontSize:props.coords.yourKolejka.FontSize,
              fill: props.coords.yourKolejka.Fill,
              className: "yourKolejka",
              originX: props.coords.yourKolejka.OriginX,
              originY: props.coords.yourKolejka.OriginY,
            });
            if (props.coords.yourKolejka.CharSpacing) {
              yourKolejka.set({
                charSpacing: props.coords.yourKolejka.CharSpacing,
              });
            }
            
            
            if (yourKolejka.width > props.coords.yourKolejka.ScaleToWidth) {
              yourKolejka.scaleToWidth(props.coords.yourKolejka.ScaleToWidth);
            }
            fabricRef.current.add(yourKolejka);
            fabricRef.current.renderAll();
          });
        }
      };
      const yourLeague = () => {
        if (props.league) {
          if (fabricRef.current && props.league === "") {
            fabricRef.current._objects.forEach((image, i) => {
              if (fabricRef.current.item(i).className === "yourLeague") {
                fabricRef.current.remove(fabricRef.current.item(i));
              }
            });
          }
          fabricRef.current._objects.forEach((image, i) => {
            if (fabricRef.current.item(i).className === "yourLeague") {
              fabricRef.current.remove(fabricRef.current.item(i));
            }
          });
    
          const font = new FontFaceObserver(props.coords.yourLeague.FontFamily);
          font.load().then(() => {
            
            const yourLeague = new fabric.Text(props.league, {
              top: props.coords.yourLeague.Top,
              left: props.coords.yourLeague.Left,
              fontFamily: props.coords.yourLeague.FontFamily,
              selectable: false,
              fontSize: props.coords.yourLeague.FontSize,
              fill: props.coords.yourLeague.Fill,
              className: "yourLeague",
              originX: props.coords.yourLeague.OriginX,
              originY: props.coords.yourLeague.OriginY,
            });
    
            if (yourLeague.width > props.coords.yourLeague.ScaleToWidth) {
              yourLeague.scaleToWidth(props.coords.yourLeague.ScaleToWidth);
            }
            fabricRef.current.add(yourLeague);
            fabricRef.current.renderAll();
          });
        }
      };
      
    return {typePlace, typeDate, yourKolejka, yourLeague}
}
