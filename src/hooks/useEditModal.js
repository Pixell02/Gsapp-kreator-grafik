
import { useState } from 'react';

export default function useEditModal() {
   const [isEditModal, setIsEditModal] = useState(false); 

   function openEditModal() {
    setIsEditModal(true);
   }

   function closeEditModal() {
    setIsEditModal(false);
   }

   return { isEditModal, openEditModal, closeEditModal };
}
