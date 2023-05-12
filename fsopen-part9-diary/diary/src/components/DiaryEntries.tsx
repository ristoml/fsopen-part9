import { DiaryEntry } from "../types";

const DiaryEntries = ({ entries }: { entries: DiaryEntry[] }) =>  {
  return (
    <div>
      <h1>Diary entries</h1>
      {entries.map((o) => (
        <div key={o.id}>
          <h3>{o.date}</h3>
          <p>visibility: {o.visibility}</p>
          <p>weather: {o.weather}</p>
        </div>
      ))}
    </div>
  );
};

export default DiaryEntries;
