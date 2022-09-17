import React, { useState, useEffect } from "react";
import { getmetoken } from "./helper/paymentHelper";
import { processPayment } from "./helper/paymentHelper";
import { isAuthenticated } from "../auth/helper";
import DropIn from "braintree-web-drop-in-react";
import { createorder } from "./helper/orderhelper";
import { cartEmpty } from "./helper/carHelper";
import { useNavigate } from "react-router-dom";

const Paymentb = ({ products, setReload = f => f, reload = undefined }) => {
  function refreshPage() {
    window.location.reload(false);
  }
  const navigate = useNavigate()
  const [stockerror, setstockerror] = useState(true)
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {}
  });
  const showerror = () => {
   if (!stockerror) {
      console.log("mai chutiya hu")
      return (
      <div className="bg-white">
        <p className="text-dark">
        Product May be out of stock
        </p>
      </div>
      )
   }
  }
  console.log(stockerror)
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getmetoken(userId, token).then(info => {
      console.log("INFORMATION", info);
      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const showbtdropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={instance => (info.instance = instance)}
            />
            <button id="paybtn" className="btn w-100 btn-block btn-success" onClick={onPurchase}>
              Buy
            </button>
          </div>
        ) : (
          <h3></h3>
        )}
      </div>
    );
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    console.log(info)
    let getNonce = info.instance.requestPaymentMethod().then(data => {
      console.log(data)
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: getAmount()
      };
      processPayment(userId, token, paymentData)
        .then(response => {
          console.log(response)
          setInfo({ ...info, success: response.success, loading: false });
          console.log("PAYMENT SUCCESS");
          console.log(products)
          console.log(response.transaction.id)
          console.log(response.transaction.amount)
          const orderData = {
            products: products,
            transaction_id: response.transaction.id,
            amount: response.transaction.amount,
            address: isAuthenticated().user.address,
          };
          console.log(orderData)
          createorder(userId, token, orderData).then(
            data => {
              if (data.error) {
                setstockerror(!data.error)
              }
              else {
                navigate("/")
                console.log(data)
              }
            }
          );
          cartEmpty(() => {
            console.log("We got a crash I guess")
          })
          setReload(!reload)
        })
        .catch(error => {
          console.log(error)
          setInfo({ loading: false, success: false });
          console.log("PAYMENT FAILED");
        });
    });
  };

  const getAmount = () => {
    let amount = 0;
    products.map(p => {
      amount = amount + (p.count) * (p.price);
      console.log(amount)
    });
    return amount;
  };

  return (
    <div>
      {showbtdropIn()}
      {showerror()}
    </div>
  );
};

export default Paymentb;