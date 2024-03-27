import { BlendColorFilter, Filters } from "../../../../types/creatorComponentsTypes";

const useFiltersArray = () => {
  const handleReadFilters = (filters: Filters[]) => {
    const filterObject: Filters = {};
    filters.forEach((item) => {
      const filterKey = Object.keys(item);
      if (filterKey.length === 1) {
        filterKey.forEach((key) => {
          filterObject[key] = { [key]: item[filterKey[0]] };
        });
      } else {
        filterObject.blendColor = { ...item } as BlendColorFilter;
      }
    });
    return filterObject;
  };

  return handleReadFilters;
};

export default useFiltersArray;
