export function generateId(): string {
  return (
    Math.random().toString(36).substring(2, 4) +
    Math.random().toString(36).substring(2, 4)
  )
}

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
