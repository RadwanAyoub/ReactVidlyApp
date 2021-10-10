import _ from "lodash";

export function Filter(items, filter, propertyText) {
  if (!filter) return items;
  if (propertyText.length === 3) {
    return items.filter(
      (item) =>
        item[propertyText[0]][propertyText[1]][propertyText[2]] === filter
    );
  }
  if (propertyText.length === 2) {
    return items.filter(
      (item) => item[propertyText[0]][propertyText[1]] === filter
    );
  }
  return items.filter((item) => item.propertyText.name === filter);
}

export function Sort(items, path, order) {
  return _.orderBy(items, path, order);
}
