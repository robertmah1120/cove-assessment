import { isScheduleConflict } from "./utils";

describe("isScheduleConflict", () => {
  it("returns [false] for an empty list", () => {
    expect(isScheduleConflict([])).toBe(false);
  });

  it("returns false for a single reservation", () => {
    expect(
      isScheduleConflict([
        {
          start: new Date("2025-06-25T10:00:00"),
          end: new Date("2025-06-25T11:00:00"),
        },
      ])
    ).toBe(false);
  });

  it("returns false for non-overlapping reservations", () => {
    expect(
      isScheduleConflict([
        {
          start: new Date("2025-06-25T10:00:00"),
          end: new Date("2025-06-25T11:00:00"),
        },
        {
          start: new Date("2025-06-25T11:00:00"),
          end: new Date("2025-06-25T12:00:00"),
        },
      ])
    ).toBe(false);
  });

  it("returns true for overlapping reservations", () => {
    expect(
      isScheduleConflict([
        {
          start: new Date("2025-06-25T10:00:00"),
          end: new Date("2025-06-25T11:30:00"),
        },
        {
          start: new Date("2025-06-25T11:00:00"),
          end: new Date("2025-06-25T12:00:00"),
        },
      ])
    ).toBe(true);
  });

  it("returns true for multiple overlapping reservations", () => {
    expect(
      isScheduleConflict([
        {
          start: new Date("2025-06-25T09:00:00"),
          end: new Date("2025-06-25T10:30:00"),
        },
        {
          start: new Date("2025-06-25T10:00:00"),
          end: new Date("2025-06-25T11:00:00"),
        },
        {
          start: new Date("2025-06-25T11:00:00"),
          end: new Date("2025-06-25T12:00:00"),
        },
      ])
    ).toBe(true);
  });

  it("returns false for reservations that just touch at endpoints", () => {
    expect(
      isScheduleConflict([
        {
          start: new Date("2025-06-25T08:00:00"),
          end: new Date("2025-06-25T09:00:00"),
        },
        {
          start: new Date("2025-06-25T09:00:00"),
          end: new Date("2025-06-25T10:00:00"),
        },
        {
          start: new Date("2025-06-25T10:00:00"),
          end: new Date("2025-06-25T11:00:00"),
        },
      ])
    ).toBe(false);
  });
});
