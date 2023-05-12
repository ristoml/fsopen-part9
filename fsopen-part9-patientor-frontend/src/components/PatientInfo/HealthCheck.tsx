import { HealthCheckEntry, Diagnose } from "../../types";
import CircleIcon from "@mui/icons-material/Circle";
import WorkIcon from "@mui/icons-material/Work";

interface Props {
  entry: HealthCheckEntry;
  diagnoses: Diagnose[];
}

const HealthCheck = ({ entry, diagnoses }: Props) => {
  let color: "green" | "yellow" | "orange" | "red";

  switch (entry.healthCheckRating) {
    case 0:
      color = "green";
      break;
    case 1:
      color = "yellow";
      break;
    case 2:
      color = "orange";
      break;
    case 3:
      color = "red";
      break;
    default:
      color = "green";
      break;
  }
  if (entry.diagnosisCodes) {
    return (
      <div>
        <p>
          {entry.date}
          <WorkIcon />
        </p>
        <p>{entry.description}</p>
        <CircleIcon sx={{ color: { color } }} />
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
          <WorkIcon />
        </p>
        <p>{entry.description}</p>
        <CircleIcon sx={{ color: { color } }} />
      </div>
    );
  }
};

export default HealthCheck;
