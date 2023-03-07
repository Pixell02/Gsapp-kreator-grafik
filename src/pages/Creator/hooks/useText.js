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
    
          const font = new FontFaceObserver(props.coords.typePlaceFontFamily);
          
            font.load().then(() => {
          const typePlace = new fabric.Text(props.place.toUpperCase(), {
            selectable: false,
            charSpacing: props.coords.typePlaceCharSpacing,
            textAlign: "center",
            top: props.coords.typePlaceTop,
            left: props.coords.typePlaceLeft,
            width: props.coords.typePlaceWidth,
            className: "typePlace",
            fontSize: props.coords.typePlaceFontSize,
            fill: props.coords.typePlaceFill,
            originX: props.coords.typePlaceOriginX,
            originY: props.coords.typePlaceOriginY,
            fontFamily: props.coords.typePlaceFontFamily,
          });
          
    
          if (typePlace.width >= props.coords.typePlaceScaleToWidth) {
            typePlace.scaleToWidth(props.coords.typePlaceScaleToWidth);
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
                fill: props.coords.typePlaceFill,
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
          const font = new FontFaceObserver(props.coords.typeDataFontFamily);
          font.load().then(() => {
          const typeDate = new fabric.Text(props.date.toUpperCase(), {
            selectable: false,
            top: props.coords.typeDataTop,
            left: props.coords.typeDataLeft,
            width: props.coords.typeDataWidth,
            className: "typeDate",
            fontSize: props.coords.typeDataFontSize,
            fill: props.coords.typeDataFill,
            originX: props.coords.typeDataOriginX,
            originY: props.coords.typeDataOriginY,
            fontFamily: props.coords.typeDataFontFamily,
            charSpacing: props.coords.typeDataCharSpacing,
          });      
          console.log(typeDate)
          if (typeDate.width >= props.coords.typeDataScaleToWidth) {
            typeDate.scaleToWidth(props.coords.typeDataScaleToWidth);
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
                fill: props.coords.typeDataFill,
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
          const font = new FontFaceObserver(props.coords.yourKolejkaFontFamily);
          font.load().then(() => {
            if (props.poster === "wsAn3pPtaand0xDdNZ5S") {
              props.kolejka = props.kolejka.toUpperCase();
            }
            const yourKolejka = new fabric.Text(props.kolejka, {
              top: props.coords.yourKolejkaTop,
              left: props.coords.yourKolejkaLeft,
              fontFamily: props.coords.yourKolejkaFontFamily,
              selectable: false,
              fill: props.coords.yourKolejkaFill,
              className: "yourKolejka",
              originX: props.coords.yourKolejkaOriginX,
              originY: props.coords.yourKolejkaOriginY,
            });
            if (props.coords.yourKolejkaCharSpacing) {
              yourKolejka.set({
                charSpacing: props.coords.yourKolejkaCharSpacing,
              });
            }
    
            if (props.coords.yourKolejkaWidth) {
              yourKolejka.set({
                width: props.coords.yourKolejkaWidth,
              });
            }
            if (props.coords.yourKolejkaScaleToHeight) {
              yourKolejka.scaleToHeight(props.coords.yourKolejkaScaleToHeight);
            }
            if (props.coords.yourKolejkaFontSize) {
              yourKolejka.set({
                fontSize: props.coords.yourKolejkaFontSize,
              });
            }
            if (yourKolejka.width > props.coords.yourKolejkaScaleToWidth) {
              yourKolejka.scaleToWidth(props.coords.yourKolejkaScaleToWidth);
            }
            fabricRef.current.add(yourKolejka);
          });
        }
      };
      const yourLeague = () => {
        if (props.league) {
          if (fabricRef.current && props.league === "") {
            fabricRef.current._objects.forEach((image, i) => {
              if (fabricRef.current.item(i).className == "yourLeague") {
                fabricRef.current.remove(fabricRef.current.item(i));
              }
            });
          }
          fabricRef.current._objects.forEach((image, i) => {
            if (fabricRef.current.item(i).className === "yourLeague") {
              fabricRef.current.remove(fabricRef.current.item(i));
            }
          });
    
          const font = new FontFaceObserver(props.coords.yourLeagueFontFamily);
          font.load().then(() => {
            if (props.poster === "mvzttPwmXvDWCz4vJefn") {
              props.league = props.league.toUpperCase();
            }
            const yourLeague = new fabric.Text(props.league, {
              top: props.coords.yourLeagueTop,
              left: props.coords.yourLeagueLeft,
              fontFamily: props.coords.yourLeagueFontFamily,
              selectable: false,
              fill: props.coords.yourLeagueFill,
              className: "yourLeague",
              originX: props.coords.yourLeagueOriginX,
              originY: props.coords.yourLeagueOriginY,
            });
    
            if (props.coords.yourLeagueWidth) {
              yourLeague.set({
                width: props.coords.yourLeagueWidth,
              });
            }
            if (props.coords.yourLeagueScaleToHeight) {
              yourLeague.scaleToHeight(props.coords.yourLeagueScaleToHeight);
            }
            if (props.coords.yourLeagueFontSize) {
              yourLeague.set({
                fontSize: props.coords.yourLeagueFontSize,
              });
            }
            if (yourLeague.width > props.coords.yourLeagueScaleToWidth) {
              yourLeague.scaleToWidth(props.coords.yourLeagueScaleToWidth);
            }
            fabricRef.current.add(yourLeague);
          });
        }
      };
      
    return {typePlace, typeDate, yourKolejka, yourLeague}
}
