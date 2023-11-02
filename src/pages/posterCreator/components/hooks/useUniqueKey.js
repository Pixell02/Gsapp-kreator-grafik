const useUniqueKey = (fabricRef) => {
  const getUniqueTextArray = (array) => {
    const uniqueClasses = new Set();
    array.reverse();
    return array.filter((item) => {
      if (!uniqueClasses.has(item.className) && fabricRef.current?._objects?.some((obj) => obj.className === item.className)) {
        uniqueClasses.add(item.className);
        return true;
      }

      return false;
    });
  };
  return { getUniqueTextArray };
};

export default useUniqueKey;
