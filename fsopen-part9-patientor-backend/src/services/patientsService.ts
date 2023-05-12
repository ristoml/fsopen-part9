import { v1 as uuid } from 'uuid';

import patientsData from "../../data/patients-full";

import { HiddenSsnPatient, Patient, NewPatient } from "../types";

import toNewPatient from '../utils';

const patients: Patient[] = patientsData.map(obj => {
  const object = toNewPatient(obj) as Patient;
  object.id = obj.id;
  return object;
});

const getPatients = (): Patient[] => {
  return patients;
};

const getByIdPatient = (id: string): HiddenSsnPatient | undefined => { 
  return patients.find((p) => p.id === id);
}

const getHiddenSsnPatients = (): HiddenSsnPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...patient
  };

  patientsData.push(newPatient);
  return (newPatient);
};

export default {
  getPatients,
  getByIdPatient,
  getHiddenSsnPatients,
  addPatient
};
