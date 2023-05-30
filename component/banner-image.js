import React from 'react'
import useSWR from 'swr'
import styles from "../styles/Home.module.css";
import soldOut from "../Images/soldOut.png";
import soldOutMobile from "../Images/soldOutMobile.png";
import cancelled from "../Images/cancelled.png";
import camcelledMobile from "../Images/camcelledMobile.png";
import downloadArrows from "../Images/downloadArrows.png";
import Image from 'next/image';

// Fetching Data - Active Banners 
// fetcher function same as fetch 
// const fetcher = async () => {
//     const response = await fetch(
//       "https://candleriggs-staging-73rkv.ondigitalocean.app/api/activeBanner"
//     );
//     const data = await response.json();
//     return data // Important : return data
//   };

export default function BannerImage({banners}) {
   // swr : React Hooks library for data fetching. For more : https://swr.vercel.app/
  //   const { data, error, isLoading } = useSWR('bannerImage', fetcher)

  // console.log(data)
  //   if (error) return <div>failed to load</div>
  //   if (isLoading) return <div>loading...</div>


  return (
    <div className={styles.banner_container}>
        
        {banners.slice(0, 1).map((banner, i) => (
              <>
              <div className="event_banner">

                <div className={styles.soldOut}>
                  {banner.eventType === "Sold Out" ? (
                    <Image
                      alt="preview"
                      src={soldOut}
                      priority
                      className={styles.desktopBannerSold}
                    />
                  ) : banner.eventType === "Cancelled" ? (
                    <Image
                      alt="preview"
                      src={cancelled}
                      priority
                      className={styles.desktopBannerSold}
                    />
                  ) : null}
                </div>
              </div>
                <div
                  className={`${styles["fContImagesDesktop"]} ${styles["fContImages"]}`}
                  key={i}
                >
                  <Image
                    width={450}
                    height={450}
                    src={banner.desktopImage ? banner.desktopImage : banner.mobileImage}
                    className="img-fluid"
                    priority
                    alt=""
                  />
                </div>
                {/* <div
                  className={`${styles["desktopArrow"]} ${styles["downloadArrow"]}`}
                >
                  <Image
                    width={450}
                    height={450}
                    src={downloadArrows}
                    alt=""
                    className={styles.downloadArrow1}
                  />
                </div> */}
                <div
                  className={`${styles["fContImages"]} ${styles["fContImagesMobile"]}`}
                >
                  <Image
                    width={450}
                    height={450}
                    src={banner.mobileImage ? banner.mobileImage : banner.desktopImage}
                    priority
                    className={styles.addMobileBannerImageMobile}
                    alt=""
                  />
                </div>
                {/* <div
                  className={`${styles["MobileArrow"]} ${styles["downloadArrow"]}`}
                >
                  <Image
                    src={downloadArrows}
                    alt=""
                    width={450}
                    height={450}
                    className={styles.downloadArrow2}
                  />
                </div> */}
               
                <span className={styles.soldOut}>
                  {banner.eventType === "Sold Out" ? (
                    <Image
                      alt="preview"
                      src={soldOut}
                      priority
                      className={styles.soldOutMobileImage}
                    />
                  ) : banner.eventType === "Cancelled" ? (
                    <Image
                      alt="preview"
                      src={camcelledMobile}
                      priority
                      className={styles.soldOutMobileImage}
                    />
                  ) : null}
                </span>
              </>
            ))}
    </div>
  )
}

// export async function getServerSideProps() {
//     const res = await fetch(process.env.NEXT_PUBLIC_URL + "/api/banner");
//     const data = await res.json();
//     console.log(data);
//     return {
//         props: {
//             banners: data.result,
//         },
//     };
// }