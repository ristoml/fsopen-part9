import { HospitalEntry, Diagnose } from "../../types";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

interface Props {
  entry: HospitalEntry;
  diagnoses: Diagnose[];
}

const Hospital = ({ entry, diagnoses }: Props) => {
  if (entry.diagnosisCodes) {
    return (
      <div>
        <p>
          {entry.date} <LocalHospitalIcon />
        </p>
        {entry.diagnosisCodes.map((code, i) => (
          <div key={i}>
            {code} {diagnoses.map((d) => (d.code === code ? d.name : ""))}
          </div>
        ))}
        <p>{entry.description}</p>
      </div>
    );
  } else {
    return (
      <div>
        <p>
          {entry.date} <LocalHospitalIcon />
        </p>
        <p>{entry.description}</p>
      </div>
    );
  }
};

export default Hospital;
