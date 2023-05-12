import { CoursePart } from "../types";

const Content = ({ courseParts }: { courseParts: CoursePart[] }) => {
  return (
    <>
      {courseParts.map((coursePart) => {
        switch (coursePart.kind) {
          case "basic": {
            return (
              <>
                <b>
                  {coursePart.name} {coursePart.exerciseCount}
                </b>
                <p>{coursePart.description}</p>
              </>
            );
          }
          case "background": {
            return (
              <>
                <b>
                  {coursePart.name} {coursePart.exerciseCount}
                </b>
                <p>{coursePart.description}</p>
                <p>submit to {coursePart.backgroundMaterial}</p>
              </>
            );
          }
          case "group": {
            return (
              <>
                <b>
                  {coursePart.name} {coursePart.exerciseCount}
                </b>
                <p>project exercises {coursePart.groupProjectCount}</p>
              </>
            );
          }
          case "special": {
            return (
              <>
                <b>
                  {coursePart.name} {coursePart.exerciseCount}
                </b>
                <p>
                  required skills:
                  {coursePart.requirements.map((r) => (
                    <p key={r}>{r}</p>
                  ))}
                </p>
              </>
            );
          }
          default: {
            return <></>;
          }
        }
      })}
    </>
  );
};

export default Content;
