import { FabricReference } from "../../../../types/creatorComponentsTypes";

const useUniqueKey = (fabricRef: FabricReference) => {
  const getUniqueTextArray = <T extends { className: string }>(array: T[]) => {
    const uniqueClasses = new Set();

    array.reverse();
    return array.filter((item) => {
      if (
        !uniqueClasses.has(item.className) &&
        fabricRef.current?._objects?.some((obj) => obj.className === item.className)
      ) {
        uniqueClasses.add(item.className);
        return true;
      }

      return false;
    });
  };
  return { getUniqueTextArray };
};

export default useUniqueKey;
