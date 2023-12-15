
import { useState } from 'react';

export default function useEditModal() {
   const [isEditModal, setIsEditModal] = useState(false); 

   const openEditModal = () => {
    setIsEditModal(true);
   }

   const closeEditModal = () => {
    setIsEditModal(false);
   }

   return { isEditModal, openEditModal, closeEditModal };
}
