import React, { useState, useEffect } from "react";
import { DiaryEntry, NewDiaryEntry } from "./types";
import { getAllDiaries, createEntry } from "./services/diaryService";
import DiaryEntries from "./components/DiaryEntries";
import AddEntry from "./components/AddEntry";

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);
  const handleAddDiary = (diary: NewDiaryEntry) => {
    createEntry(diary).then((data) => {
      setDiaries(diaries.concat(data))
    });
  };
  return (
    <div className='App'>
      <AddEntry handleAddDiary={handleAddDiary} />
      <DiaryEntries entries={diaries} />
    </div>
  );
}

export default App;
