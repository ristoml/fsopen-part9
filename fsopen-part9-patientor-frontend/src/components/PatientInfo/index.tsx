import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Patient, Entry, Diagnose } from "../../types";

import patientService from "../../services/patients";
import diagnoseService from "../../services/diagnoses";

import MaleIcon from "@mui/icons-material/MaleOutlined";
import FemaleIcon from "@mui/icons-material/FemaleOutlined";
import CircleIcon from "@mui/icons-material/Circle";

import HealthCheck from "./HealthCheck";
import Hospital from "./Hospital";
import OccupationalHealthcare from "./OccupationalHealthcare";

const PatientInfo = () => {
  const [patient, setPatient] = useState<Patient>();
  const [diagnoses, setDiagnoses] = useState<Diagnose[]>([]);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatient = async () => {
      const patient = await patientService.getPatientById(id as string);
      setPatient(patient);     
    };
    void fetchPatient();

    const fetchDiagnoses = async () => {
      const diagnoses = await diagnoseService.getAll();
      setDiagnoses(diagnoses);
    };
    void fetchDiagnoses();
  }, [id]);

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  interface Props {
    entry: Entry;
    diagnoses: Diagnose[];
  }

  const EntryDetails = ({ entry, diagnoses }: Props) => {
    switch (entry.type) {
      case "Hospital":
        return <Hospital entry={entry} diagnoses={diagnoses}/>;
      case "OccupationalHealthcare":
        return <OccupationalHealthcare entry={entry} diagnoses={diagnoses}/>;
      case "HealthCheck":
        return <HealthCheck entry={entry} diagnoses={diagnoses}/>;
      default:
        return assertNever(entry);
    }
  };

  if (patient) {
    return (
      <>
        <div>
          <h1>
            {patient.name} {patient.gender === "male" && <MaleIcon />}
            {patient.gender === "female" && <FemaleIcon />}
            {patient.gender === "other" && <CircleIcon />}
          </h1>
          <p>ssn: {patient.ssn}</p>
          <p>occupation: {patient.occupation}</p>
        </div>
        <div>
          <h2>entries</h2>
          {patient.entries.map((entry, i) => (
            <div key={i}>
              <EntryDetails entry={entry} diagnoses={diagnoses} />
            </div>
          ))}
        </div>
      </>
    );
  } else return <h1>Loading...</h1>;
};

export default PatientInfo;
