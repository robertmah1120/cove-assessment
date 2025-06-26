import "./App.css";
import { useEffect, useMemo, useState } from "react";
import { DatePicker } from "./DatePicker";
import { DropDownSelect } from "./DropDownSelect";
import { ReservationList } from "./ReservationList";

interface Reservation {
  id: string;
  start: string;
  end: string;
  room: {
    id: string;
    name: string;
    imageUrl: string;
  };
}

const RESERVATION_API =
  "https://cove-coding-challenge-api.herokuapp.com/reservations";

const App = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedRoomId, setSelectedRoomId] = useState<string>("");

  useEffect(() => {
    fetch(RESERVATION_API)
      .then((res) => res.json())
      .then((data) => {
        setReservations(data);
        if (data.length > 0 && !selectedRoomId) {
          setSelectedRoomId(data[0].room.id);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const roomOptions = useMemo(() => {
    const seen = new Map<string, { value: string; name: string }>();
    reservations.forEach((r) => {
      if (!seen.has(r.room.id)) {
        seen.set(r.room.id, { value: r.room.id, name: r.room.name });
      }
    });
    return Array.from(seen.values());
  }, [reservations]);

  const filteredReservations = useMemo(() => {
    return reservations.filter((r) => {
      if (selectedRoomId && r.room.id !== selectedRoomId) return false;
      const startDate = new Date(r.start);
      return (
        startDate.getFullYear() === selectedDate.getFullYear() &&
        startDate.getMonth() === selectedDate.getMonth() &&
        startDate.getDate() === selectedDate.getDate()
      );
    });
  }, [reservations, selectedRoomId, selectedDate]);

  return (
    <div className="app">
      <div className="app-filters">
        <div className="app-filter-item">
          <DatePicker
            value={selectedDate}
            onChange={(date) => {
              if (date) setSelectedDate(date);
            }}
          />
        </div>
        <div className="app-filter-item">
          <DropDownSelect
            value={selectedRoomId}
            onChange={setSelectedRoomId}
            options={roomOptions}
          />
        </div>
      </div>
      <div className="app-reservations">
        <ReservationList
          reservations={filteredReservations.map((r) => ({
            start: new Date(r.start),
            end: new Date(r.end),
            room: r.room,
          }))}
        />
      </div>
    </div>
  );
};

export default App;
