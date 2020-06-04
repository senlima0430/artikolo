export function replaceItemAtIndex(
  arr: { id: string; type: string; value: string; isEdit: boolean }[],
  index: number,
  newValue: { id: string; type: string; value: string; isEdit: boolean }
) {
  if (arr.length === 1) {
    return [newValue]
  }

  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)]
}
