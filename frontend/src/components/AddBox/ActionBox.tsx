import React, { FormEvent } from "react";
import "./ActionBox.css";

function AddBox() {
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const target = e.target as typeof e.target & {
      name: { value: string };
      brand: { value: string };
      amount: { value: number };
    };

    const formData = {
      name: target.name.value,
      brand: target.brand.value,
      amount: Number(target.amount.value),
    };

    await fetch("http://localhost:8000/groceries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    window.location.reload();
  }

  async function handleClear() {
    await fetch(`http://localhost:8000/groceries`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    window.location.reload();
  }

  return (
    <div className="input-wrap">
      <div className="action-container">
        <button
          className="btn btn-outline-primary"
          data-bs-toggle="modal"
          data-bs-target="#itemModal"
          type="button"
        >
          Add Item
        </button>
        <button className="btn btn-outline-primary" onClick={()=> handleClear()}>Clear</button>
      </div>

      <div
        className="modal fade"
        id="itemModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Create an Item
              </h1>

              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={(e) => handleSubmit(e)}>
                <label className="form-label">Name</label>
                <input required={true} className="form-control" id="name" />
                <label className="form-label">Brand</label>
                <input required={true} className="form-control" id="brand" />
                <label className="form-label">Amount</label>
                <input
                  type="number"
                  required={true}
                  className="form-control"
                  id="amount"
                />

                <button className="btn btn-primary">Add Item</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBox;
