import { FormElement } from '@tomino/dynamic-form';

export function findConflict(cells: FormElement[], start: number, end: number) {
  return cells.find(
    e =>
      (e.column >= start && e.column <= end) ||
      (e.column + e.width - 1 >= start && e.column + e.width - 1 <= end)
  );
}
