const useFiltersArray = () => {
  const handleReadFilters = (filters) => {
    const filterObject = {};
    filters.forEach((item) => {
      const filterKey = Object.keys(item);
      if (filterKey.length === 1) {
        filterKey.forEach((key) => {
          filterObject[key] = { [key]: item[filterKey] };
        });
      } else {
        filterObject.blendColor = { ...item };
      }
    });
    return filterObject;
  };

  return handleReadFilters;
};

export default useFiltersArray;
