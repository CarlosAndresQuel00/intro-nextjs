import Link from "next/link";
import Image from "next/image";
import spider from "../../public/images/SPIDER-MEN.png";
import Head from "next/head";
import styles from "@/styles/Home.module.css";

const HolaPage = () => {
  return (
    <>
      <Head>
        <title>Hola</title>
      </Head>
      <div className={styles.main}>
        <p>Hola Mundo!</p>
        <p>
          Regresar a{" "}
          <Link href="/">
            <a className="">index</a>
          </Link>{" "}
          con link
        </p>
        <Image
          src={spider}
          width={144}
          height={144}
          placeholder="blur"
          alt="spider-men"
        />
      </div>
    </>
  );
};

export default HolaPage;
