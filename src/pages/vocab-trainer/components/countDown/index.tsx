import { AlertDialog } from '@/components/alertDialog';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Countdown = () => {
  const [countdown, setCountdown] = useState(1200); // 600 giây = 10 phút
  const [openModal, setOpenModal] = useState(false);
  const countdownRef = useRef(countdown);
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
    localStorage.removeItem('questions');
    navigate('/vocab-trainer');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        setOpenModal(true); // Đánh dấu đếm lùi đã kết thúc
      }
    }, 1000);

    countdownRef.current = countdown;

    return () => clearTimeout(timer);
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
