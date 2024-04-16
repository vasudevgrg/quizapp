import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';
import { Label } from '@mui/icons-material';

export default function Question({id,idx,statement, option1, option2, option3, option4, correctOption, setAttempted, setCorrect, attempted, correct}) {
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [helperText, setHelperText] = React.useState('Choose wisely');

  const handleRadioChange = (event) => {
    setValue(event.target.value);
    setHelperText(' ');
    setError(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (value === correctOption) {
      setHelperText('You got it!');
      setAttempted([...attempted, {"id": id, "correct": true}]);

      setError(false);
    } else if (value != correctOption) {
      setHelperText('Sorry, wrong answer!');
      setAttempted([...attempted, {"id": id, "correct": false}]);
      setError(true);
    } else {
      setHelperText('Please select an option.');
      setError(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl sx={{ m: 3 }} error={error} variant="standard">
        <Label>Question {idx+1}</Label>
        <FormLabel id="demo-error-radios"> {statement}</FormLabel>
        <RadioGroup
          aria-labelledby="demo-error-radios"
          name="quiz"
          value={value}
          onChange={handleRadioChange}
        >
          <FormControlLabel value={option1} control={<Radio />} label={option1} />
          <FormControlLabel value={option2} control={<Radio />} label={option2} />
          <FormControlLabel value={option3} control={<Radio />} label={option3} />
          <FormControlLabel value={option4} control={<Radio />} label={option4} />
        </RadioGroup>
        <FormHelperText>{helperText}</FormHelperText>
        <Button sx={{ mt: 1, mr: 1 }} type="submit" variant="outlined">
          Check Answer
        </Button>
      </FormControl>
    </form>
  );
}
