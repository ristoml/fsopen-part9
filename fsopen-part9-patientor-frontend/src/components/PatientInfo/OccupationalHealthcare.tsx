import { OccupationalHealthcareEntry, Diagnose } from "../../types";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";

interface Props {
  entry: OccupationalHealthcareEntry;
  diagnoses: Diagnose[];
}
const OccupationalHealthcare = ({ entry, diagnoses }: Props) => {
  if (entry.diagnosisCodes) {
    return (
      <div>
        <p>
          {entry.date}
          <MedicalServicesIcon />
        </p>
        <p>{entry.description}</p>
        {entry.diagnosisCodes.map((code, i) => (
          <div key={i}>
            {code} {diagnoses.map((d) => (d.code === code ? d.name : ""))}
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <p>
          {entry.date}
          <MedicalServicesIcon />
        </p>
        <p>{entry.description}</p>
      </div>
    );
  }
};

export default OccupationalHealthcare;
