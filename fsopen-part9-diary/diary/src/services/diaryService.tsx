import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";

const baseUrl = "http://localhost:3000/api/diaries";

export const getAllDiaries = () => {
  return axios.get<DiaryEntry[]>(baseUrl).then((response) => response.data);
};

export const createEntry = (object: NewDiaryEntry) => {  
  const obj: DiaryEntry = {
    id: Math.floor(Math.random() * 999),
    date: object.date,
    weather: object.weather,
    visibility: object.visibility,
    comment: object.comment
  };
  return axios.post<DiaryEntry>(baseUrl, obj).then((response) => response.data);
};
