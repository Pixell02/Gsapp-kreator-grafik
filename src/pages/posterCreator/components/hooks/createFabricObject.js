import React from 'react'
import { fabric } from "fabric";

export const createFabricText = (fabricRef, setFabricObject, name, className) => {
  const text = new fabric.Text(name, {
    top: 400,
    left: 400,
    fontSize: 55,
    className: className,
    fill: "#000000",
    fontFamily: "Poppins",
    type: "text"
  })
  fabricRef.current.add(text);
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
        })
  setFabricObject(prevState => [...prevState, { name }])
  ;
}

export const createFabricTextBox = (fabricRef, setFabricObject, name, className) => {
  const text = new fabric.Textbox(name, {
    top: 400,
    left: 400,
    fontSize: 25,
    className: className,
    fill: "#000000",
    fontFamily: "Poppins",
    type: "textBox",
  })
  fabricRef.current.add(text);
  setFabricObject(prevState => [...prevState, { name }])
  ;
}
export const createMultiplyText = (fabricRef, setFabricObject, name, className, loops) => {
  
  const objects = loops.map((loop, i) => {
    const text = new fabric.Text(name, {
      top: i * 20,
      left: 200,
      fontSize: 25,
      className: className,
      fill: "#000",
      fontFamily: "Poppins",
      type: "multiply",
      selectable: i === 0 ? true : false
    })
    return text;
  });
  const group = new fabric.Group(objects, {
    left: 0,
    top: 0,
    className: className,
    type: "multiply",
    originY: "top",
    fontSize: 25,
    fontFamily: "Poppins",
    Margin: 20,
    format: "dotted"
  });
  
  fabricRef.current.add(group);

  setFabricObject(prevState => [...prevState, { name }])
  ;
}
