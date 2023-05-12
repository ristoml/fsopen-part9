interface result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface rating {
  rating: number;
  ratingDescription: string;
}

interface targetAndHours {
  target: number;
  hours: number[];
}

export const parsedArgumentsExercise = (args: string[]): targetAndHours => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 20) throw new Error("Too many arguments");
  let tempTarget = 0;
  const tempHours = [];

  if (!isNaN(Number(args[2]))) tempTarget = Number(args[2]);
  else throw new Error("You didnt provide numbers");

  for (let i = 3; i < args.length; i++) {
    if (!isNaN(Number(args[i]))) tempHours.push(Number(args[i]));
    else throw new Error("You didnt provide numbers");
  }
  return {
    target: tempTarget,
    hours: tempHours
  };
};

const calculateRating = (avg: number, target: number): rating => {
  if (avg < target * 0.8) {
    return {
      rating: 1,
      ratingDescription: "you can do a lot better"
    };
  } else if (avg > target * 1.2) {
    return {
      rating: 3,
      ratingDescription: "you really excelled yourself!"
    };
  }
  return {
    rating: 2,
    ratingDescription: "well done, but you can still do better"
  };
};

export const calculateExercises = (hours: number[], target: number): result => {
  const currentRating = calculateRating(
    hours.reduce((a, c) => a + c, 0) / hours.length,
    target
  );

  return {
    periodLength: hours.length,
    trainingDays: hours.filter((d) => d !== 0).length,
    success: hours.reduce((a, c) => a + c, 0) / hours.length >= target,
    rating: currentRating.rating,
    ratingDescription: currentRating.ratingDescription,
    target: target,
    average: hours.reduce((a, c) => a + c, 0) / hours.length
  };
};
try {
  const { target, hours } = parsedArgumentsExercise(process.argv);
  console.log(calculateExercises(hours, target));
} catch (error: unknown) {
  let errorMessage = "Something went wrong";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
