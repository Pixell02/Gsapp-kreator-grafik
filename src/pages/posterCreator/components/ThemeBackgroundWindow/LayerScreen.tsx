import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  UniqueIdentifier,
  closestCorners,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { FabricReference } from "../../../../types/creatorComponentsTypes";
import Column from "./Column";
import { useEffect, useState } from "react";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { Object } from "fabric/fabric-impl";

export type ObjectItem = {
  id: UniqueIdentifier;
  // eslint-disable-next-line @typescript-eslint/ban-types
  object: Object;
};

const LayerScreen = ({ fabricRef }: { fabricRef: FabricReference }) => {
  const [objects, setObjects] = useState<ObjectItem[]>([]);

  useEffect(() => {
    console.log(fabricRef.current);
    if (!fabricRef.current) return;

    const fabricObjects = fabricRef.current.getObjects();
    const mappedObjects = fabricObjects.map((object, i) => ({
      id: i as UniqueIdentifier,
      object: object,
    }));
    setObjects(mappedObjects);
  }, [fabricRef]);

  const getTaskPos = (id: UniqueIdentifier) => objects.findIndex((object) => object.id === id);

  const handleDragEnd = (e: DragEndEvent) => {
    const { active, over } = e;
    if (!over) return;
    if (active.id === over?.id) return;
    setObjects((objects) => {
      const originalPos = getTaskPos(active.id);
      const newPos = getTaskPos(over.id);

      return arrayMove(objects, originalPos, newPos);
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  return (
    <div className="d-flex w-100 flex-column h-100">
      <DndContext sensors={sensors} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
        <Column objects={objects} fabricRef={fabricRef} />
      </DndContext>
    </div>
  );
};

export default LayerScreen;
