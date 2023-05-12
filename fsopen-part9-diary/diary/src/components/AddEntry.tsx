import { Weather, Visibility, NewDiaryEntry } from "../types";
type AppProps = {
  handleAddDiary: (NewDiaryEntry: NewDiaryEntry) => void;
};

const AddEntry = ({ handleAddDiary }: AppProps) => {
  const handleSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      myDate: { value: string };
      myInput: { value: string };
      myRadio: { value: string };
      myRadio2: { value: string };
    };

    const obj: NewDiaryEntry = {
      date: target.myDate.value as string,
      comment: target.myInput.value as string,
      visibility: target.myRadio.value as Visibility,
      weather: target.myRadio2.value as Weather
    };
    handleAddDiary(obj);
  };

  return (
    <div>
      <form method='post' onSubmit={handleSubmit}>
        <p>
          <label>
            date <input type='date' name='myDate' />
          </label>
        </p>
        <p>
          visibility
          <label>
            <input type='radio' name='myRadio' value='great' />
            great
          </label>
          <label>
            <input type='radio' name='myRadio' value='good' />
            good
          </label>
          <label>
            <input type='radio' name='myRadio' value='ok' />
            ok
          </label>
          <label>
            <input type='radio' name='myRadio' value='poor' />
            poor
          </label>
        </p>
        <p>
          weather
          <label>
            <input type='radio' name='myRadio2' value='sunny' />
            sunny
          </label>
          <label>
            <input type='radio' name='myRadio2' value='rainy' />
            rainy
          </label>
          <label>
            <input type='radio' name='myRadio2' value='cloudy' />
            cloudy
          </label>
          <label>
            <input type='radio' name='myRadio2' value='stormy' />
            stormy
          </label>
          <label>
            <input type='radio' name='myRadio2' value='windy' />
            windy
          </label>
        </p>
        <p>
          <label>
            comment <input name='myInput' />
          </label>
        </p>
        <button type='submit'>Add entry</button>
      </form>
    </div>
  );
};
export default AddEntry;
