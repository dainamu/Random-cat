import { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "./index.module.css";

type Props = {
  initialImageUrl: string;
};
type Image = {
  url: string;
};

const IndexPage: NextPage<Props> = ({ initialImageUrl }) => {
  const [imageUrl, setImageUrl] = useState<string>(initialImageUrl);
  const [loadin, setLoading] = useState<boolean>(false);

  // マウント時に画像を読み込む宣言
  // useEffect(() => {
  //   fetchImage().then((newImage) => {
  //     setImageUrl(newImage.url); // 画像URLの状態を更新
  //     setLoading(false);
  //   });
  // }, []);

  const handleClick = async () => {
    setLoading(true);
    const newImage = await fetchImage();
    setImageUrl(newImage.url);
    setLoading(false);
  };
  return (
    <div className={styles.page}>
      <button className={styles.button} onClick={handleClick}>
        One More Cat!
      </button>
      <div className={styles.frame}>
        {loadin || <img className={styles.img} src={imageUrl} />}
      </div>
    </div>
  );
};

const fetchImage = async (): Promise<Image> => {
  const res = await fetch("https://api.thecatapi.com/v1/images/search");
  const images = await res.json();
  console.log(images);
  return images[0];
};

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const image = await fetchImage();

  return {
    props: {
      initialImageUrl: image.url,
    },
  };
};

export default IndexPage;
