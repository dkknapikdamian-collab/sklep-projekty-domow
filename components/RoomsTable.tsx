import { Project } from "@/data/projects";

export function RoomsTable({ project }: { project: Project }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Nr</th>
            <th>Pomieszczenie</th>
            <th>Kondygnacja</th>
            <th>Powierzchnia</th>
            <th>Wymiary</th>
          </tr>
        </thead>
        <tbody>
          {project.roomList.map((room) => (
            <tr key={`${room.floor}-${room.number}`}>
              <td>{room.number}</td>
              <td>{room.name}</td>
              <td>{room.floor}</td>
              <td>{room.area} m²</td>
              <td>{room.dimensions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
