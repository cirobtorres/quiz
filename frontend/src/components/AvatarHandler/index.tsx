import { useState } from "react";

import styles from "./AvatarHandler.module.css";

interface UserParams {
  username: string;
  avatar: string | null;
  selectedImage: File | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<File | null>>;
}

export default function AvatarHandler({
  username,
  avatar,
  selectedImage,
  setSelectedImage,
}: UserParams): JSX.Element {
  const imageHasChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const removeSelectedImage = () => {
    // Not being used
    setSelectedImage(null);
  };

  return (
    <div className={styles.container}>
      <h2>Avatar</h2>
      <div className={styles.avatarContainer}>
        <input type="file" onChange={imageHasChanged} />
        {avatar && !selectedImage ? (
          <img
            src={avatar}
            alt={`Avatar de ${username}`}
            onClick={() => console.log(avatar)}
            className={styles.selectedImage}
          />
        ) : selectedImage ? (
          <img
            src={URL.createObjectURL(selectedImage)}
            alt={`Avatar de ${username}`}
            title={`Avatar de ${username}`}
            className={styles.selectedImage}
          />
        ) : (
          <div className={styles.addAvatar}>
            <span>+</span>
            <span>Adicionar Avatar</span>
          </div>
        )}
      </div>
    </div>
  );
}
