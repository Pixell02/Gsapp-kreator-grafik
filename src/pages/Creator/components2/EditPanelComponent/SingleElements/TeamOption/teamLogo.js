import { fabric } from "fabric";

const teamLogo = (fabricRef, yourLogo, coords, themeOption, radioChecked) => {
  fabricRef.current._objects.forEach((image, i) => {
    if (fabricRef.current.item(i).className === "teamLogo") {
      fabricRef.current.remove(fabricRef.current.item(i));
      fabricRef.current.renderAll();
    }
  });
  const img = new Image();
  img.src = yourLogo;

  img.onload = () => {
    fabric.Image.fromURL(img.src, function (img) {
      img.set({
        selectable: false,
        top:
          radioChecked === "radio1"
            ? parseInt(coords.yourTeamLogo.Top)
            : parseInt(coords.opponentImage.Top),
        left:
          radioChecked === "radio1"
            ? parseInt(coords.yourTeamLogo.Left)
            : parseInt(coords.opponentImage.Left),
        originX: "center",
        originY: "center",
        angle:
          radioChecked === "radio1"
            ? coords.yourTeamLogo.Angle || 0
            : coords.opponentImage.Angle || 0,
        className: "teamLogo",
      });
      img.scaleToHeight(coords.yourTeamLogo.ScaleToHeight);
      if (coords.yourTeamLogo.ScaleToWidth) {
        if (img.width * img.scaleX > coords.yourTeamLogo.ScaleToWidth) {
          img.scaleToWidth(coords.yourTeamLogo.ScaleToWidth);
        }
      }
      fabricRef.current.add(img);
      fabricRef.current.renderAll();
    });
  };
};

export default teamLogo;
