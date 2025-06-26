interface Reservation {
  start: Date;
  end: Date;
}

/**
 * @returns true if any 2 reservations conflict
 *   - reservations conflict if their times overlap in any way
 *   - reservations DO NOT conflict if they are just touching each other (reservation1.end === reservation2.start)
 */
export const isScheduleConflict = (reservations: Reservation[]) => {
  if (reservations.length < 2) return false;
  const sorted = [...reservations].sort(
    (a, b) => a.start.getTime() - b.start.getTime()
  );
  for (let i = 1; i < sorted.length; i++) {
    const prev = sorted[i - 1];
    const curr = sorted[i];

    if (curr.start < prev.end) {
      return true;
    }
  }
  return false;
};
