import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const percentage = 66;

export const CircleProgress = () => {
  return (
    <div style={{ width: 200, height: 200 }}>
       <CircularProgressbar
        value={percentage}
        text={`${percentage}%`}
        strokeWidth={15}
      />
    </div>
  );
};
