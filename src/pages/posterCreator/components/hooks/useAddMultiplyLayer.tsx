import { fabric } from "fabric";
import { useGlobalPropertiesContext } from "../../Context/GlobalProperitesContext";
import { ActiveObjectCoords, FabricReference } from "../../../../types/creatorComponentsTypes";
import { Image } from "fabric/fabric-impl";

const useAddMultiplyLayer = (fabricRef: FabricReference) => {
  const { properties } = useGlobalPropertiesContext();

  const handleCreateImage = (image: string, object: ActiveObjectCoords) => {
    const loadedImage = (img: Image) => {
      img.set({
        top: properties.orientation === "vertically" ? Number(object.top) + properties.Margin : Number(object.top),
        left: properties.orientation === "horizontally" ? Number(object.left) + properties.Margin : Number(object.left),
        className: object.className,
        originX: "center",
        originY: "center",
        scaleX: Number(object.scaleX),
        scaleY: Number(object.scaleY),
        type: "multiplyimage",
        index: Number(object.index) + 1,
        selectable: false,
      });
      fabricRef.current.add(img);
      fabricRef.current.renderAll();
    };

    fabric.Image.fromURL(image, (img) => loadedImage(img));
  };

  const handleCreateText = (innerText: string, object: ActiveObjectCoords) => {
    const text = new fabric.Text(innerText, {
      top: properties.orientation === "vertically" ? Number(object.top) + properties.Margin : Number(object.top),
      left: properties.orientation === "horizontally" ? Number(object.left) + properties.Margin : Number(object.left),
      className: object.className,
      originX: object.originX as string,
      originY: object.originY as string,
      fontFamily: object.fontFamily as string,
      scaleX: object.scaleX as number,
      scaleY: object.scaleY as number,
      type: "multiplyText",
      index: (object.index as number) + 1,
      selectable: false,
    });
    fabricRef.current.add(text);
    fabricRef.current.renderAll();
  };

  const handleCreateUniversalText = (innerText: string, object: ActiveObjectCoords) => {
    const text = new fabric.Text(innerText, {
      top: properties.orientation === "vertically" ? Number(object.top) + properties.Margin : Number(object.top),
      left: properties.orientation === "horizontally" ? Number(object.left) + properties.Margin : Number(object.left),
      className: object.className,
      originX: object.originX as string,
      originY: object.originY as string,
      fontFamily: object.fontFamily as string,
      scaleX: Number(object.scaleX),
      scaleY: Number(object.scaleY),
      type: object.type,
      id: Number(object.id),
      index: Number(object.index) + 1,
      selectable: false,
    });
    fabricRef.current.add(text);
    fabricRef.current.renderAll();
  };

  return { handleCreateImage, handleCreateText, handleCreateUniversalText };
};

export default useAddMultiplyLayer;
