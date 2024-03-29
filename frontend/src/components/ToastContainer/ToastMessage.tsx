import React, { useEffect } from 'react';
import { Bounce, toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  hideToastMessage,
  selectCreateMessage,
} from '../../features/cocktails/cocktailsSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

const ToastMessage: React.FC = () => {
  const dispatch = useAppDispatch();
  const createMessage = useAppSelector(selectCreateMessage);

  useEffect(() => {
    if (createMessage && createMessage.message) {
      void notify();
      const timer = setTimeout(() => {
        dispatch(hideToastMessage());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [createMessage, dispatch]);

  const notify = () => {
    toast.success(createMessage?.message, {
      position: 'top-center',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      transition: Bounce,
    });
  };

  return (
    <>
      {createMessage && createMessage.message && (
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar
          theme="colored"
        />
      )}
    </>
  );
};

export default ToastMessage;
