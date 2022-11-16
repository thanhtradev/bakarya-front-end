import Link from "next/link";
import React, { useState } from "react";
import styles from "./Payment.module.css";
import { useDispatch, useSelector } from "react-redux";
import { payment } from "../../redux/user.reducer";
import { useCookies } from "react-cookie";
function Payment() {
  const dispatch = useDispatch();
  const userSlice = useSelector((state) => state.userSlice.pay);
  const [checkOne, setCheckOne] = useState(false);
  const [cookies, setCookies] = useCookies();
  const [username, setUsername] = useState(cookies.username);
  const payments = () => {
    dispatch(payment());
  };
  return (
    <div className={styles["view-wrapper"]}>
      {/*Wrapper*/}
      <div className={styles["shop-wrapper"]}>
        {/*Header*/}
        <div className={`${styles["cart-container"]} ${styles["is-payment"]}`}>
          <div className={styles["cart-header"]}>
            <div className={styles["header-inner"]}>
              <h2 id="checkout-step-title">Payment</h2>
              <div className={styles["header-actions"]}>
                <div className={styles["buttons"]}>
                  <a
                    href="/navbar-v1-ecommerce-checkout.html"
                    className={`${styles["button is-light"]} ${styles["is-hidden"]}`}
                  >
                    <span className={`${styles["icon"]} ${styles["is-small"]}`}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`${styles["feather"]} ${styles["feather-arrow-left"]}`}
                      >
                        <line x1={19} y1={12} x2={5} y2={12} />
                        <polyline points="12 19 5 12 12 5" />
                      </svg>
                    </span>
                    <span>Back</span>
                  </a>
                  <Link
                    href="/checkout"
                    className={`${styles["button"]} ${styles["is-solid"]} ${styles["primary-button"]} ${styles["raised"]}`}
                  >
                    View Order
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*Container*/}
        <div
          id="payment-container"
          className={`${styles["checkout-container"]} ${
            checkOne && styles["is-hidden"]
          }`}
        >
          {/*Left Side*/}
          <div className={styles["left"]}>
            <div className={styles["left-header"]}>
              <div className={styles["header-inner"]}>
                <img
                  className={styles["avatar"]}
                  src="assets/img/icons/logos/store.svg"
                  alt="image"
                />
                <div className={styles["separator"]} />
                <div className={styles["title-wrap"]}>
                  <h3 className={styles["payment-title"]}>Pay your order</h3>
                  <p className={styles["payment-subtitle"]}>
                    Enter your credit card information
                  </p>
                </div>
              </div>
              <div className={styles["header-coupon"]}>
                <div className={`${styles["field"]} ${styles["is-grouped"]}`}>
                  <div className={styles["control"]}>
                    <input
                      type="text"
                      className={styles["input"]}
                      placeholder="Gift card or discount code"
                    />
                  </div>
                  <div className={styles["control"]}>
                    <button
                      className={`${styles["button"]} ${styles["is-solid"]} ${styles["primary-button"]} ${styles["raised"]}`}
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
              <div className={styles["header-foot"]}>
                <span className={styles["label"]}>Total</span>
                <span className={styles["amount"]} data-currency="USD">
                  ${userSlice[0]?.sum}
                </span>
              </div>
            </div>
            <div className={styles["left-body"]} />
          </div>
          {/*Right Side*/}
          <div className={styles["right"]}>
            <div className={styles["payment-form"]}>
              <form
                action="/charge"
                method="post"
                id="stripe-payment-form"
                className={`${styles["provider-form"]} ${styles["is-active"]}`}
              >
                <div
                  id="checkout-contact-section"
                  className={`${styles["form-section"]} ${styles["has-margin-bottom"]}`}
                >
                  <div className={styles["form-section-header"]}>
                    <h3>Contact Information</h3>
                  </div>
                  <div className={styles["field"]}>
                    <label htmlFor="card-element">Email Address</label>
                    <div className={styles["control"]}>
                      <input
                        className={styles["input"]}
                        placeholder="Enter your email address"
                        name="checkout_email"
                        defaultValue={username}
                        autofocus
                      />
                    </div>
                  </div>
                </div>
                <div
                  id="checkout-payment-section"
                  className={styles["form-section"]}
                >
                  <div className={styles["form-section-header"]}>
                    <h3>Payment Information</h3>
                  </div>
                  <div className={styles["field"]}>
                    <label htmlFor="card-element">Name on card</label>
                    <div className={styles["control"]}>
                      <input
                        className={styles["input"]}
                        placeholder="Enter the name on the credit card"
                        name="checkout_name"
                      />
                    </div>
                  </div>
                  <div className={styles["field"]}>
                    <label htmlFor="card-element">Credit or debit card</label>
                    <div className={styles["control"]}>
                      <div
                        id="card-element"
                        className={`${styles["StripeElement"]} ${styles["StripeElement--empty"]}`}
                      >
                        <div
                          className={styles["__PrivateStripeElement"]}
                          style={{
                            margin: "0px !important",
                            padding: "0px !important",
                            border: "none !important",
                            display: "block !important",
                            background: "transparent !important",
                            position: "relative !important",
                            opacity: "1 !important",
                          }}
                        >
                          <iframe
                            frameBorder={0}
                            allowTransparency="true"
                            scrolling="no"
                            role="presentation"
                            allow="payment *"
                            src="https://js.stripe.com/v3/elements-inner-card-3f1dc6dccf75fce268f106acf1b9cf98.html#wait=false&mids[guid]=NA&mids[muid]=NA&mids[sid]=NA&style[base][fontSize]=14px&style[base][color]=%23595d6e&rtl=false&componentName=card&keyMode=test&apiKey=pk_test_6pRNASCoBOKtIshFeQd4XMUh&referrer=http%3A%2F%2Flocalhost%3A3000%2Fnavbar-v1-ecommerce-payment.html&controllerId=__privateStripeController7811"
                            title="Secure card payment input frame"
                            style={{
                              border: "none !important",
                              margin: "0px !important",
                              padding: "0px !important",
                              width: "1px !important",
                              minWidth: "100% !important",
                              overflow: "hidden !important",
                              display: "block !important",
                              userSelect: "none !important",
                              transform: "translate(0px) !important",
                              colorScheme: "light only !important",
                              height: "16.8px",
                            }}
                          />
                        </div>
                      </div>
                      {/* Used to display Element errors */}
                      <div id="card-errors" role="alert" />
                    </div>
                  </div>
                  <div className={styles["field"]}>
                    <label>Country</label>
                    <div
                      className={`${styles["control"]} ${styles["has-icons-left"]}`}
                    >
                      <div className={styles["select"]}>
                        <select>
                          <option />
                          <option selected>United States of America</option>
                          <option>Belgium</option>
                          <option>Brazil</option>
                          <option>Canada</option>
                          <option>France</option>
                          <option>Germany</option>
                          <option>Mexico</option>
                          <option>Spain</option>
                          <option>England</option>
                          <option>Luxembourg</option>
                        </select>
                      </div>
                      <div
                        className={`${styles["icon"]} ${styles["is-small"]} ${styles["is-left"]}`}
                      >
                        <i
                          className={`${styles["mdi"]} ${styles["mdi-earth"]}`}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`${styles["field"]} ${styles["is-button"]}`}>
                  <div
                    className={`${styles["buttons"]} ${styles["has-addons"]}`}
                  >
                    <button
                      id="payment-button"
                      type="button"
                      className={`${styles["button"]} ${styles["is-solid"]} ${styles["primary-button"]}`}
                      onClick={() => {
                        setCheckOne(true);
                        payments();
                      }}
                    >
                      Confirm Payment
                    </button>
                    <button
                      type="button"
                      className={`${styles["button"]} ${styles["is-solid"]} ${styles["primary-button"]}`}
                      style={{ borderRadius: " 0px 10px 10px 0px" }}
                    >
                      ${userSlice[0]?.sum}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div
          id="confirmation-container"
          className={`${styles["checkout-container"]} ${
            !checkOne && styles["is-hidden"]
          }`}
        >
          <div className={styles["confirmation-box"]}>
            <svg
              id="successAnimation"
              className={styles["animated"]}
              xmlns="http://www.w3.org/2000/svg"
              width={70}
              height={70}
              viewBox="0 0 70 70"
            >
              <path
                className={styles["successAnimationResult"]}
                fill="#41d6c3"
                d="M35,60 C21.1928813,60 10,48.8071187 10,35 C10,21.1928813 21.1928813,10 35,10 C48.8071187,10 60,21.1928813 60,35 C60,48.8071187 48.8071187,60 35,60 Z M23.6332378,33.2260427 L22.3667622,34.7739573 L34.1433655,44.40936 L47.776114,27.6305926 L46.223886,26.3694074 L33.8566345,41.59064 L23.6332378,33.2260427 Z"
              />
              <circle
                className={styles["successAnimationCircle"]}
                cx={35}
                cy={35}
                r={24}
                stroke="#979797"
                strokeWidth={2}
                strokeLinecap="round"
                fill="transparent"
              />
              <polyline
                id="successAnimationCheck"
                stroke="#979797"
                strokeWidth={2}
                points="23 34 34 43 47 27"
                fill="transparent"
              />
            </svg>
            <h3>Your payment was successful.</h3>
            <p>
              Thank you for your purchase. We will immediatly start preparing
              your order and ship it to you.
            </p>
            <div className={styles["order-summary"]}>
              <h4>Order Summary</h4>
              <div className={styles["order-line"]}>
                <div className={styles["item"]}>
                  <span>Transaction ID</span>
                </div>
                <div className={styles["amount"]}>
                  <span>#45894</span>
                </div>
              </div>
              <div className={styles["order-line"]}>
                <div className={styles["item"]}>
                  <span>Subtotal</span>
                </div>
                <div className={styles["amount"]}>
                  <span data-currency="USD">${userSlice[0]?.sum}</span>
                </div>
              </div>
              <div className={styles["order-line"]}>
                <div className={styles["item"]}>
                  <span>Shipping</span>
                </div>
                <div className={styles["amount"]}>
                  <span data-currency="USD">$3</span>
                </div>
              </div>
              <div className={styles["order-line"]}>
                <div className={styles["item"]}>
                  <span>Taxes</span>
                </div>
                <div className={styles["amount"]}>
                  <span data-currency="USD">$2</span>
                </div>
              </div>
              <div className={styles["order-line"]}>
                <div className={`${styles["item"]} ${styles["is-total"]}`}>
                  <span>Total</span>
                </div>
                <div className={`${styles["amount"]} ${styles["is-total"]}`}>
                  <span data-currency="USD">${userSlice[0]?.sum + 3 + 5}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
