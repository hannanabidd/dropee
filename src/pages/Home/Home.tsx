import * as React from "react";
import lodash from "lodash";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import { Button } from "components/ui/Button";
import { ProductList } from "components/base/ProductList";
import { Form } from "features/CreateProduct";
import logo from "images/droppe-logo.png";
import img1 from "images/img1.png";
import img2 from "images/img2.png";
import styles from "./styles.module.css";
import { getProducts, sendProposal } from "api/product";

const ShopApp: React.FC = () => {
  const [products, setProducts] = React.useState<any[]>([]);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [isShowingMessage, setIsShowingMessage] =
    React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>("");
  const [numFavorites, setNumFavorites] = React.useState<number>(0);
  const [prodCount, setProdCount] = React.useState<number>(0);

  React.useEffect(() => {
    const asyncHandler = async () => {
      const res = await getProducts();
      if (!res) return;
      const a = await res.json();
      console.log("res", a);
      setProducts(a);
      setProdCount(a.length);
    };
    asyncHandler();
  }, []);

  React.useEffect(() => {
    document.title = "Droppe refactor app";
  }, []);

  const favClick = (title: string) => {
    const prods = products;
    const idx = lodash.findIndex(prods, { title: title });
    let currentFavs = numFavorites;
    let totalFavs: any;
    if (prods[idx].isFavorite) {
      prods[idx].isFavorite = false;
      totalFavs = --currentFavs;
    } else {
      totalFavs = ++currentFavs;
      prods[idx].isFavorite = true;
    }
    setNumFavorites(totalFavs);
    setProducts(prods);
  };

  const onSubmit = (payload: {
    title: string;
    description: string;
    price: string;
  }) => {
    const updated = lodash.clone(products);
    updated.push({
      title: payload.title,
      description: payload.description,
      price: payload.price,
    });

    setProducts(updated);
    setProdCount(lodash.size(products) + 1);
    setIsOpen(false);
    setIsShowingMessage(true);
    setMessage("Adding product...");

    // **this POST request doesn't actually post anything to any database**

    const asyncHandler = async () => {
      const res = await sendProposal({
        title: payload.title,
        price: payload.price,
        description: payload.description,
      });
      if (!res) return;
      console.log(res);
      setTimeout(() => {
        setIsShowingMessage(false);
        setMessage("");
      }, 2000);
    };
    asyncHandler();
  };
  return (
    <>
      <div className={styles.header}>
        <div className={["container", styles.headerImageWrapper].join(" ")}>
          <img src={logo} alt="logo" className={styles.headerImage} />
        </div>
      </div>

      <div
        className={["container", styles.main].join(" ")}
        style={{
          margin: "50px inherit",
          display: "flex",
          justifyContent: "space-evenly",
        }}>
        <img src={img1} alt="img1" className={styles.images} />
        <img src={img2} alt="img2" className={styles.images} />
      </div>
      <div
        className={["container", styles.main].join(" ")}
        style={{ paddingTop: 0 }}>
        <div className={styles.buttonWrapper}>
          <Button onClick={() => setIsOpen(true)}>Send product proposal</Button>
          {isShowingMessage && (
            <div className={styles.messageContainer}>
              <i>{message}</i>
            </div>
          )}
        </div>

        <div className={styles.statsContainer}>
          <span>Total products: {prodCount}</span>
          {" - "}
          <span>Number of favorites: {numFavorites}</span>
        </div>

        {products && !!products.length ? (
          <ProductList products={products} onFav={favClick} />
        ) : (
          <div></div>
        )}
      </div>
      <>
        <Modal
          isOpen={isOpen}
          className={styles.reactModalContent}
          overlayClassName={styles.reactModalOverlay}>
          <div className={styles.modalContentHelper}>
            <div className={styles.modalClose} onClick={() => setIsOpen(false)}>
              <FaTimes />
            </div>
            <Form on-submit={onSubmit} />
          </div>
        </Modal>
      </>
    </>
  );
};

export default ShopApp;
