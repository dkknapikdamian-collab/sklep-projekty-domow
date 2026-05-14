"use client";

import { X } from "lucide-react";
import { roomFloorOptions } from "./admin-project-options";

export type RoomRow = {
  floor: string;
  customFloor?: string;
  number: string;
  name: string;
  area: string;
  dimensions: string;
};

const CUSTOM_FLOOR = "__custom__";

function updateRow<T>(rows: T[], index: number, patch: Partial<T>) {
  return rows.map((row, currentIndex) => (currentIndex === index ? { ...row, ...patch } : row));
}

export function normalizeRooms(rows: RoomRow[]) {
  return rows.map((room) => ({
    ...room,
    floor: room.floor === CUSTOM_FLOOR ? room.customFloor || "" : room.floor
  }));
}

export function roomRowFromDb(floor: string, number: string, name: string, area: number, dimensions: string): RoomRow {
  const hasPreset = roomFloorOptions.some((option) => option.value === floor);
  return {
    floor: hasPreset ? floor : CUSTOM_FLOOR,
    customFloor: hasPreset ? "" : floor,
    number,
    name,
    area: String(area || ""),
    dimensions
  };
}

export function AdminProjectRoomsEditor({ rooms, setRooms }: { rooms: RoomRow[]; setRooms: (rows: RoomRow[]) => void }) {
  return (
    <>
      <div className="admin-edit-table">
        <div className="admin-edit-row head"><span>Kondygnacja</span><span>Nr</span><span>Nazwa</span><span>m2</span><span>Wymiary</span><span /></div>
        {rooms.map((room, index) => (
          <div className="admin-edit-row" key={index}>
            <div className="admin-room-floor">
              <select value={room.floor} onChange={(event) => setRooms(updateRow(rooms, index, { floor: event.target.value }))}>
                {roomFloorOptions.map((option) => <option value={option.value} key={option.value}>{option.label}</option>)}
                <option value={CUSTOM_FLOOR}>Dodaj recznie</option>
              </select>
              {room.floor === CUSTOM_FLOOR && (
                <input
                  value={room.customFloor || ""}
                  onChange={(event) => setRooms(updateRow(rooms, index, { customFloor: event.target.value }))}
                  placeholder="Wlasna kondygnacja"
                />
              )}
            </div>
            <input value={room.number} onChange={(event) => setRooms(updateRow(rooms, index, { number: event.target.value }))} />
            <input value={room.name} onChange={(event) => setRooms(updateRow(rooms, index, { name: event.target.value }))} />
            <input value={room.area} onChange={(event) => setRooms(updateRow(rooms, index, { area: event.target.value }))} />
            <input value={room.dimensions} onChange={(event) => setRooms(updateRow(rooms, index, { dimensions: event.target.value }))} />
            <button type="button" onClick={() => setRooms(rooms.filter((_, currentIndex) => currentIndex !== index))}>
              <X size={15} />
            </button>
          </div>
        ))}
      </div>
      <button type="button" className="admin-secondary-button" onClick={() => setRooms([...rooms, { floor: "Parter", number: "", name: "", area: "", dimensions: "" }])}>
        Dodaj pomieszczenie
      </button>
    </>
  );
}

