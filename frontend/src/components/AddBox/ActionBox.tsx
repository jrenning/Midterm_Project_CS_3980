import React, { FormEvent } from "react";
import "./ActionBox.css";
import { Type } from "../Listbox/Listbox";

function AddBox() {
  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();


    const target = e.target as typeof e.target & {
      name: { value: string };
      type: { value: Type };
      link: { value: string };
      description: { value: string };
    };


    const formData = {
      name: target.name.value,
      type: target.type.value,
      link: target.link.value,
      description: target.description.value,
    };


    await fetch("http://localhost:8000/recs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    window.location.reload();
  }

  async function handleClear() {
    await fetch(`http://localhost:8000/recs`, {
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
          Add Recommendation
        </button>
        <button
          className="btn btn-outline-primary"
          onClick={() => handleClear()}
        >
          Clear
        </button>
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
                Create an Recommendation
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
                <input
                  required={true}
                  className="form-control"
                  id="name"
                />
                <label className="form-label">Type</label>
                <select className="form-select" id="type">
                  {Object.values(Type).map((type) => (
                    <option value={type} key={type}>{type}</option>
                  ))}
                </select>
                <label className="form-label">Description</label>
                <input
                  required={false}
                  className="form-control"
                  id="description"
                />
                <label className="form-label">Link</label>
                <input
                  required={false}
                  className="form-control"
                  id="link"
                />

                <button className="btn btn-primary">Add Recommendation</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddBox;
