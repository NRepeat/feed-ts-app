import React, { useState } from "react";

interface EditPostFormProps {
  initialTitle: string;
  onSave: (newTitle: string) => void;
  onCancel: () => void;
}

const EditPostForm: React.FC<EditPostFormProps> = ({ initialTitle, onSave, onCancel }) => {
  const [newTitle, setNewTitle] = useState(initialTitle);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const handleSave = () => {
    onSave(newTitle);
  };

  return (
    <div>
      <input type="text" value={newTitle} onChange={handleTitleChange} />
      <button onClick={handleSave}>Сохранить</button>
      <button onClick={onCancel}>Отмена</button>
    </div>
  );
};

export default EditPostForm;
