import React from 'react'
import { fabric } from "fabric";

export const createFabricText = (fabricRef, setFabricObject, name, className) => {
  const text = new fabric.IText(name, {
    top: 400,
    left: 400,
    fontSize: 55,
    className: className,
    fill: "#000000",
    fontFamily: "Poppins",
    type: "text",
    originY: "center"
  })
  fabricRef.current.add(text);
  fabricRef.current.renderAll();
  setFabricObject(prevState => [...prevState, { name }])
  ;
}

export const createFabricImage = (fabricRef, setFabricObject, name, image) => {
 
  fabric.Image.fromURL(image, function (img) {
    img.set({
            top: 400,
            left: 400,
            className: name,
            originX: "center",
            originY: "center",
            type: "image"
          })
          img.scaleToHeight(150)
    fabricRef.current.add(img);
    fabricRef.current.renderAll();
        })
  setFabricObject(prevState => [...prevState, { name }]);
}

export const createPlayerImage = (fabricRef, setFabricObject, name, image) => {

  fabric.Image.fromURL(image, function (img) {
    img.set({
            top: 400,
            left: 400,
            className: name,
            originX: "center",
            originY: "center",
            type: "image"
          })
          img.scaleToHeight(150)
    fabricRef.current.add(img);
    fabricRef.current.renderAll();
        })
  setFabricObject(prevState => [...prevState, { name }]);


}

export const createFabricTextBox = (fabricRef, setFabricObject, name, className) => {
  
  const text = new fabric.Textbox(name, {
    top: 400,
    left: 400,
    fontSize: 25,
    lineHeight: 1,
    width: 500,
    originX: "center",
    originY: "top",
    className: className,
    textAlign: "left",
    fill: "#000000",
    fontFamily: "Poppins",
    format: "NumDotSurName",
    Formatter: className === "reserveOne" ? "," : undefined,
    type: "textBox",
  })
  fabricRef.current.add(text);
  fabricRef.current.renderAll();
  setFabricObject(prevState => [...prevState, { name }])
  ;
}
export const createMultiplyText = (fabricRef, setFabricObject, name, className, loops) => {
  
  const text = new fabric.Textbox(name, {
    top: 400,
    left: 400,
    fontSize: 25,
    lineHeight: 1,
    width: 500,
    originX: "center",
    originY: "top",
    className: className,
    fill: "#000000",
    fontFamily: "Poppins",
    format: "NumDotSurName",
    Formatter: className === "reserveOne" ? "," : undefined,
    type: "textBox",
  })
  fabricRef.current.add(text);
  fabricRef.current.renderAll();
  setFabricObject(prevState => [...prevState, { name }])
  ;
}
