import React from 'react'
import { Modal, Box } from '@mui/material';
interface IModalEdit {
  modalIsOpen: boolean,
  closeModal: () => void,
  editedPost: Post,
  handleFieldChange: (field: string, value: string) => void,
  saveChanges: () => Promise<void>
}
function ModalEdit({ modalIsOpen, closeModal, editedPost, handleFieldChange, saveChanges }: IModalEdit) {

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <Modal
      open={modalIsOpen}
      onClose={closeModal}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: "50%" }}>
        <h2 className='text-center text-3xl'> <strong>Edit Fields</strong> </h2>
        <div className='flex flex-col gap-5 pt-5 pb-5'>
          <input
            className='border-2 p-2'
            type="text"
            value={editedPost.title}
            onChange={(e) => handleFieldChange('title', e.target.value)}
          />
          <input
            className='border-2 p-2'
            type="text"
            value={editedPost.categories}
            onChange={(e) => handleFieldChange('categories', e.target.value)}
          />
          <input
            className='border-2 p-2 '
            type="text"
            value={editedPost.pubDate}
            onChange={(e) => handleFieldChange('pubDate', e.target.value)}
          />

        </div>
        <div className='flex justify-between'>
          <button className='border-2 p-2  hover:bg-green-600 hover:text-white' onClick={saveChanges}>Save Changes</button>
          <button className='border-2 p-2 hover:bg-black hover:text-white' onClick={closeModal}>Close Modal</button>
        </div>

      </Box>
    </Modal>
  )
}

export default ModalEdit