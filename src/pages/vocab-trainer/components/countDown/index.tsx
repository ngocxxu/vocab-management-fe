import { AlertDialog } from '@/components/alertDialog';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type TCountdownProps = {
  countdown: number;
  setCountdown: React.Dispatch<React.SetStateAction<number>>;
};

export const Countdown = ({ countdown, setCountdown }: TCountdownProps) => {
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const customMinutes = (time: number) => {
    return time < 10 ? '0' + time : time;
  };

  const minutes = customMinutes(Math.floor(countdown / 60));
  const seconds = countdown % 60;

  const handleOnYes = () => {
    window.location.reload();
  };

  const handleOnNo = () => {
    localStorage.removeItem('examId');
    localStorage.removeItem('questions');
    navigate('/vocab-trainer');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        setOpenModal(true);
      }
    }, 1000);

    return () => clearTimeout(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [countdown]);

  return (
    <div>
      <div>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>

      <AlertDialog
        open={openModal}
        onOpenChange={setOpenModal}
        title='Sorry. Time is up for you!'
        content='You have not completed this test within the specified time, it will be transferred to Fail status. You can redo this test immediately by pressing the Retest button.'
        titleBtn='Retest'
        onYes={() => handleOnYes()}
        onNo={() => handleOnNo()}
      />
    </div>
  );
};
