import React, { useState } from "react";
import styles from "./Checkout.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addPayment } from "../../redux/user.reducer";
// import { useRouter } from "next/navigation";
import { Badge, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import Link from "next/link";
import pic from "../../assets/logo.png";
import { useRouter } from "next/router";
const MyBtn = styled(Button)({
  height: "40px",
  width: "40px",
  padding: "0",
});
function Checkout() {
  const dispatch = useDispatch();
  const router = useRouter();
  const userSlice = useSelector((state) => state.userSlice.cart);
  const arr = userSlice.map((u) => {
    return u.price * u.quantity;
  });
  const sum = arr.reduce((partialSum, a) => partialSum + a, 0);
  const [checkOne, setCheckOne] = useState(false);
  const [checkSecond, setCheckSecond] = useState(false);
  const sectionOne = () => {
    document
      .getElementById("checkout-section-1")
      .classList.remove("Checkout_is-active__H3wGk");
    document
      .getElementById("checkout-section-2")
      .classList.add("Checkout_is-active__H3wGk");
    setCheckOne(true);
  };
  const sectionSecond = () => {
    document
      .getElementById("checkout-section-2")
      .classList.remove("Checkout_is-active__H3wGk");
    document
      .getElementById("checkout-section-3")
      .classList.add("Checkout_is-active__H3wGk");
    setCheckSecond(true);
  };
  const addToPay = (sum) => {
    router.push("/payment");
    dispatch(addPayment({ sum }));
  };
  return (
    <div
      id='shop-page'
      className={`${styles.container} ${styles.sidebar_boxed}`}
      data-open-sidebar
      data-page-title='Checkout'
    >
      {/*Payment Wrapper*/}
      <div className={styles["shop-wrapper"]}>
        <div className={styles["cart-container"]}>
          <div className={styles["cart-header"]}>
            <div
              className={`${styles["header-inner"]} ${styles["is-smaller"]}`}
            >
              <h2 id='checkout-step-title'>1. Confirm your order</h2>
              <div className={styles["header-actions"]}>
                <div className={styles["buttons"]}>
                  <a
                    id='checkout-back'
                    className={`${styles["button"]} ${styles["is-light"]}`}
                    data-step={0}
                  >
                    <span className={`${styles["icon"]} ${styles["is-small"]}`}>
                      <i data-feather='arrow-left' />
                    </span>
                    <span>Back</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/*Checkout content*/}
          <div className={styles["cart-content"]}>
            <div className={styles["columns"]}>
              <div className={`${styles["column"]} ${styles["is-8"]}`}>
                {/*Checkout section 1*/}
                <div
                  id='checkout-section-1'
                  className={`${styles["checkout-section"]} ${styles["is-active"]}`}
                >
                  {/*Table*/}
                  <div className={styles["flex-table"]}>
                    {/*Table header*/}
                    <div className={styles["flex-table-header"]}>
                      <span className={styles["product"]}>
                        <span>Product</span>
                      </span>
                      <span className={styles["quantity"]}>Quantity</span>
                      <span className={styles["price"]}>Price</span>
                      <span className={styles["discount"]}>Discount</span>
                      <span className={styles["total"]}>Total</span>
                    </div>
                    {userSlice.length > 0 ? (
                      userSlice.map((userSlice, index) => (
                        <div className={styles["flex-table-item"]} key={index}>
                          <div className={styles["product"]}>
                            <img src={userSlice.img} alt='' />
                            <span className={styles["product-name"]}>
                              {userSlice.name}
                            </span>
                          </div>
                          <div className={styles["quantity"]}>
                            <span className={styles["has-price"]}>
                              {userSlice.quantity}
                            </span>
                          </div>
                          <div className={styles["price"]}>
                            <span className={styles["has-price"]}>
                              {userSlice.price}
                            </span>
                          </div>
                          <div className={styles["discount"]}>
                            <span className={styles["has-price"]}>0</span>
                          </div>
                          <div className={styles["total"]}>
                            <span className={styles["has-price"]}>
                              {userSlice.price * userSlice.quantity}
                            </span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <Box
                        component={MyBtn}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          minWidth: "100%",
                          height: "40px",
                          padding: "0",
                          color: "#333",
                          "& :hover": {
                            color: "white",
                          },
                          margin: "0 10px",
                        }}
                      >
                        <Badge badgeContent={0} color='primary'>
                          <Link href='/shopping'>
                            Add some thing to your cart
                          </Link>
                        </Badge>
                      </Box>
                    )}
                  </div>
                </div>
                {/*Checkout section*/}
                <div
                  id='checkout-section-2'
                  className={styles["checkout-section"]}
                >
                  <div
                    className={`${styles["columns"]} ${styles["is-multiline"]}`}
                  >
                    <div className={`${styles["column"]} ${styles["is-6"]}`}>
                      <div
                        className={`${styles["address-box"]} ${styles["shipping-address"]}`}
                      >
                        <input
                          className={styles["address-boxInput"]}
                          type='radio'
                          name='shipping_address'
                        />
                        <div className={styles["address-box-inner"]}>
                          <p>Jenna Davis</p>
                          <p>53 Miguel Abrejo St.</p>
                          <p>Suite G 63, 92618</p>
                          <p>Los Angeles, CA</p>
                        </div>
                      </div>
                    </div>
                    <div className={`${styles["column"]} ${styles["is-6"]}`}>
                      <div
                        className={`${styles["address-box"]} ${styles["shipping-address"]}`}
                      >
                        <input
                          className={styles["address-boxInput"]}
                          type='radio'
                          name='shipping_address'
                        />
                        <div className={styles["address-box-inner"]}>
                          <p>Jenna Davis</p>
                          <p>578 Juan Velasquez Parkway.</p>
                          <p>Appartment 88, 92612</p>
                          <p>Los Angeles, CA</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles["add-address-link"]}>
                    <a>
                      <i data-feather='plus' />
                      <span>Add Address</span>
                    </a>
                  </div>
                </div>
                <div
                  id='checkout-section-3'
                  className={styles["checkout-section"]}
                >
                  <div
                    className={`${styles["columns"]} ${styles["is-multiline"]}`}
                  >
                    <div className={`${styles["column"]} ${styles["is-4"]}`}>
                      <div className={styles["shipping-box"]}>
                        <input
                          className={styles["shipping-boxInput"]}
                          type='radio'
                          name='shipping_method'
                        />
                        <div className={styles["shipping-box-inner"]}>
                          <img src={pic.src} alt='' />
                          <p>Bakarya Shipping</p>
                        </div>
                      </div>
                    </div>
                    <div className={`${styles["column"]} ${styles["is-4"]}`}>
                      <div className={styles["shipping-box"]}>
                        <input
                          className={styles["shipping-boxInput"]}
                          type='radio'
                          name='shipping_method'
                        />
                        <div className={styles["shipping-box-inner"]}>
                          <img
                            src='https://uploads-ssl.webflow.com/5fb85f26f126ce08d792d2d9/62d66b80b43387c88d617c8c_After_kime%402x-100.jpg'
                            alt=''
                            style={{ height: "83px", width: "50px" }}
                          />
                          <p>GHTK</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/*Right Side*/}
              <div className={`${styles["column"]} ${styles["is-4"]}`}>
                <div className={styles["cart-summary"]}>
                  <div className={styles["summary-header"]}>
                    <h3>Order Summary</h3>
                  </div>
                  {/*card*/}
                  <div className={styles["summary-card"]}>
                    <div className={styles["order-line"]}>
                      <span>Subtotal</span>
                      <span>{sum}</span>
                    </div>
                    <div className={styles["order-line"]}>
                      <span>Taxes</span>
                      <span>2</span>
                    </div>
                    <div id='total-amount' className={styles["order-line"]}>
                      <span className={styles["is-total"]}>Total</span>
                      <span className={styles["is-total"]}>{sum + 2}</span>
                    </div>
                    <div className={styles["button-wrap"]}>
                      {userSlice.length > 0 ? (
                        <>
                          {checkOne ? (
                            <>
                              {checkSecond ? (
                                <button
                                  id='checkout-button'
                                  className={`${styles["button"]} ${styles["is-solid"]} ${styles["primary-button"]} ${styles["raised"]} ${styles["is-fullwidth"]}`}
                                  onClick={() => addToPay(sum)}
                                >
                                  Continue
                                </button>
                              ) : (
                                <button
                                  id='checkout-button'
                                  className={`${styles["button"]} ${styles["is-solid"]} ${styles["primary-button"]} ${styles["raised"]} ${styles["is-fullwidth"]}`}
                                  onClick={sectionSecond}
                                >
                                  Continue
                                </button>
                              )}
                            </>
                          ) : (
                            <button
                              id='checkout-button'
                              className={`${styles["button"]} ${styles["is-solid"]} ${styles["primary-button"]} ${styles["raised"]} ${styles["is-fullwidth"]}`}
                              onClick={sectionOne}
                            >
                              Continue
                            </button>
                          )}
                        </>
                      ) : (
                        <button
                          id='checkout-button'
                          className={`${styles["button"]} ${styles["is-solid"]} ${styles["primary-button"]} ${styles["raised"]} ${styles["is-fullwidth"]}`}
                          style={{
                            width: "100%",
                            opacity: ".4",
                          }}
                          disabled
                        >
                          Continue
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Checkout;
