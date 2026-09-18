"use client";

import { Calendar } from "@/components/ui/calendar";
import { useEffect, useState } from "react";
import { reservations } from "@/data/reservation";
import type { DateRange } from "react-day-picker";

const formatDate = (date: Date | undefined): string | null => {
  if (!date) return null;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export default function MonCalendrier() {
  const [range, setRange] = useState<DateRange | undefined>();
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    if (!range?.from || !range?.to) {
      setData([]);
      return;
    }

    const dateFrom = formatDate(range.from);
    const dateTo = formatDate(range.to);

    const selectedData = reservations.filter((item) => {
      return item.date >= dateFrom! && item.date <= dateTo!;
    });

    setData(selectedData);
  }, [range]);

  console.log("Du :", formatDate(range?.from));
  console.log("Au :", formatDate(range?.to));

  return (
    <div>
      <Calendar
        mode="range"
        selected={range}
        onSelect={setRange}
      />

      <div className="mt-4">
        {data.length > 0 ? (
          data.map((item) => (
            <div
              key={item.date}
              className="mb-3 rounded border p-4"
            >
              <p>
                <strong>Réservation :</strong>{" "}
                {item.reservations}
              </p>

              <p>
                <strong>Status :</strong>{" "}
                {item.status}
              </p>

              <p>
                <strong>Date :</strong>{" "}
                {item.date}
              </p>
            </div>
          ))
        ) : (
          range?.from &&
          range?.to && (
            <p>Aucune réservation pour cette période.</p>
          )
        )}
      </div>
    </div>
  );
}