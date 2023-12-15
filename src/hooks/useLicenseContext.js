import  { useContext } from 'react'
import { LicenseContext } from '../context/LicenseContext';

const useLicenseContext = () => {

  const context = useContext(LicenseContext);
  if (!context) {
    throw Error('licenseContext ')
  }

  return context;
}

export default useLicenseContext
