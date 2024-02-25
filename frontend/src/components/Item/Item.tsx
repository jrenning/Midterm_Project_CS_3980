import React, { FormEvent } from "react";
import "./Item.css";

type ItemProps = {
  name: string;
  brand: string;
  amount: number;
  id: number;
};

function Item({ name, brand, amount, id }: ItemProps) {
  async function handleEdit(e: FormEvent<HTMLFormElement>) {
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

    await fetch(`http://localhost:8000/groceries/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
  }

  async function handleDelete() {
    await fetch(`http://localhost:8000/groceries/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
  }

  return (
    <div className="item-container">
      <div className="item-toprow">
        <div className="item-name">{name}</div>
        <div className="item-amount-container">
          <div>X</div>
          <div className="item-amount">{amount}</div>
        </div>
      </div>

      <div className="item-botrow">
        <div className="item-brand badge rounded-pill text-bg-success">
          {brand}
        </div>
        <div className="item-actions">
          <button
            className="badge rounded-pill text-bg-warning"
            data-bs-toggle="modal"
            data-bs-target="#editModal"
          >
            edit
          </button>
          <button
            className="badge rounded-pill text-bg-danger"
            onClick={() => handleDelete()}
          >
            delete
          </button>
        </div>
      </div>

      <div
        className="modal fade"
        id="editModal"
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
              <form onSubmit={(e) => handleEdit(e)}>
                <label className="form-label">Name</label>
                <input
                  required={true}
                  className="form-control"
                  id="name"
                  defaultValue={name}
                />
                <label className="form-label">Brand</label>
                <input
                  required={true}
                  className="form-control"
                  id="brand"
                  defaultValue={brand}
                />
                <label className="form-label">Amount</label>
                <input
                  type="number"
                  required={true}
                  className="form-control"
                  id="amount"
                  defaultValue={amount}
                />

                <button className="btn btn-primary">Update Item</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;
