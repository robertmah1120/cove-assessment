interface Reservation {
  start: Date;
  end: Date;
  room: {
    id: string;
    name: string;
    imageUrl: string;
  };
}

interface ReservationListProps {
  reservations: Reservation[];
}

export const ReservationList = ({ reservations }: ReservationListProps) => {
  if (reservations.length === 0) {
    return (
      <div className="reservation-list reservation-list-empty">
        No reservations for this date/room.
      </div>
    );
  }
  return (
    <div className="reservation-list">
      {reservations.map((r, idx) => (
        <div className="reservation-list-item" key={idx}>
          <div className="reservation-list-item-content">
            <img
              className="reservation-room-image"
              src={r.room.imageUrl}
              alt={r.room.name}
            />
            <div className="reservation-list-details">
              <div className="reservation-time">
                {r.start.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                -{" "}
                {r.end.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
              <div className="reservation-date">
                {r.start.toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </div>
            </div>
          </div>

          <div className="reservation-room-name">{r.room.name}</div>
        </div>
      ))}
    </div>
  );
};
