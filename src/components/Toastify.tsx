// Toastify.js
import { useState, useEffect } from 'react';

import { ToastContainer, ToastPosition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/toastify.css';


const Toastify = () => {

  const [toastPosition, setToastPosition] = useState<ToastPosition>("bottom-right");

  useEffect(() => {
    function handleResize() {
      // Ici, on considère md à partir de 768px, comme Tailwind
      if (window.innerWidth >= 768) {
        setToastPosition("bottom-right");
      } else {
        setToastPosition("top-center");
      }
    }

    handleResize(); // définir la position initiale au chargement

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <ToastContainer
      position={toastPosition}
      autoClose={3000}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      pauseOnHover
      limit={1}
      hideProgressBar={false}
      closeButton={true}
      icon={false}
    />
  );
}

export default Toastify;
