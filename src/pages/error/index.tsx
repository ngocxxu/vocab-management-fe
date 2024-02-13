import { useNavigate } from 'react-router-dom';
import Page404 from '../../assets/img/background/404page.webp';

export const ErrorTemplate = () => {
  const navigate = useNavigate();
  return (
    <div className='mt-4 w-fit flex justify-center items-center'>
      <img
        onClick={() => navigate('/')}
        className='block mx-auto my-auto'
        src={Page404}
        alt='Page404'
      />
    </div>
  );
};
