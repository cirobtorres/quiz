import styles from "./AvatarHandler.module.css";

interface UserParams {
  username: string;
  avatar: string | null;
  error: string;
  selectedImage: File | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<File | null>>;
}

export default function AvatarHandler({
  username,
  avatar,
  error,
  selectedImage,
  setSelectedImage,
}: UserParams): JSX.Element {
  const imageHasChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImage(event.target.files[0]);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Avatar</h2>
      <div className={`${styles.avatar} ${error ? styles.errorBorder : ""}`}>
        <input type="file" onChange={imageHasChanged} />
        {avatar && !selectedImage ? (
          <img
            src={avatar}
            alt={`Avatar de ${username}`}
            title={`Avatar de ${username}`}
            className={styles.selectedImage}
          />
        ) : selectedImage ? (
          <img
            src={URL.createObjectURL(selectedImage)}
            className={styles.selectedImage}
          />
        ) : (
          <div className={styles.addAvatar}>
            <span>+</span>
            <span>Adicionar Avatar</span>
          </div>
        )}
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}
