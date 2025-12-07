import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api";

export default function CourseDetails() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiFailed, setApiFailed] = useState(false);

  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await axios.get(`/courses/${id}`);
        setCourse(res.data);
        setApiFailed(false);
      } catch (err) {
        console.error("API Failed:", err);
        setApiFailed(true);
      } finally {
        setLoading(false);
      }
    }

    fetchCourse();
  }, [id]);

  function handlePaymentSubmit(e) {
    e.preventDefault();

    if (paymentMethod === "upi" && !upiId) {
      alert("Please enter UPI ID");
      return;
    }

    if (paymentMethod === "card" && (!cardNumber || !expiry || !cvv)) {
      alert("Please fill all card details");
      return;
    }

    alert(`Payment Successful for ${course.title}`);
    setShowPayment(false);

    // Reset form
    setUpiId("");
    setCardNumber("");
    setExpiry("");
    setCvv("");
  }

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
  }

  if (apiFailed || !course) {
    return (
      <div style={{ textAlign: "center", padding: "40px" }}>
        <h2>Course Not Found</h2>
        <p>API might be offline.</p>
      </div>
    );
  }

  return (
    <div className="details">
      <div className="card">
        <h1>{course.title}</h1>
        <p>{course.description}</p>

        <h3>Lessons</h3>
        <ul>
          {course.lessons?.length > 0 ? (
            course.lessons.map((lesson) => (
              <li key={lesson._id}>{lesson.title}</li>
            ))
          ) : (
            <li>No lessons added yet</li>
          )}
        </ul>

        <h2 className="price">Price: ₹{course.price || 99}</h2>
        <button className="buy" onClick={() => setShowPayment(true)}>
          Buy Now
        </button>
      </div>

      {showPayment && (
        <div className="modal-backdrop">
          <div className="modal">
            <h2>Payment for {course.title}</h2>

            <form onSubmit={handlePaymentSubmit}>
              <label>
                <input
                  type="radio"
                  checked={paymentMethod === "upi"}
                  onChange={() => setPaymentMethod("upi")}
                />
                UPI Payment
              </label>

              <label>
                <input
                  type="radio"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                />
                Card Payment
              </label>

              {paymentMethod === "upi" && (
                <input
                  type="text"
                  placeholder="yourupi@bank"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />
              )}

              {paymentMethod === "card" && (
                <>
                  <input
                    type="text"
                    placeholder="Card Number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                  />
                </>
              )}

              <div className="buttons">
                <button type="submit">Pay ₹{course.price || 99}</button>
                <button type="button" onClick={() => setShowPayment(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .details {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea, #764ba2);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }

        .card {
          background: white;
          padding: 35px;
          border-radius: 14px;
          max-width: 600px;
          width: 100%;
          box-shadow: 0 10px 25px rgba(0,0,0,0.2);
          text-align: center;
        }

        ul {
          text-align: left;
          margin-top: 10px;
        }

        li {
          padding: 6px 0;
          font-weight: 500;
        }

        .price {
          margin-top: 20px;
          color: #764ba2;
        }

        .buy {
          margin-top: 15px;
          background: #764ba2;
          color: white;
          padding: 12px 24px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
        }

        .modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal {
          background: white;
          padding: 25px;
          border-radius: 12px;
          width: 90%;
          max-width: 400px;
          text-align: center;
        }

        input {
          width: 100%;
          margin: 8px 0;
          padding: 10px;
        }

        .buttons {
          display: flex;
          justify-content: space-between;
          margin-top: 15px;
        }

        .buttons button {
          padding: 10px 18px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
