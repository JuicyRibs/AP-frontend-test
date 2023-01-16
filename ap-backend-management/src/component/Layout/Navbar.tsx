import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import logo from '../../../public/images/icon.png';

export const Navbar = () => {
  return (
    <>
      <div className='flex justify-between bg-blue p-2 shadow-md items-center'>
        <Image src={logo} height='30' alt='AP Logo'/>
        <FontAwesomeIcon icon={faBars} />
      </div>
    </>
  );
};
