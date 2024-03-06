import React, { FormEvent } from "react";
import "./Item.css";
import { Type } from "../Listbox/Listbox";

type ItemProps = {
  name: string;
  id: number;
  type: Type;
  link: string;
  description?: string;
};

function Item({ name, type, link, description, id }: ItemProps) {
  async function handleEdit(e: FormEvent<HTMLFormElement>) {
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

    console.log(formData);

    await fetch(`http://localhost:8000/recs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    window.location.reload();
  }

  async function handleDelete() {
    await fetch(`http://localhost:8000/recs/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    window.location.reload();
  }

  return (
    <div className="item-container">
      <div className="item-toprow">
        <div className="item-name">{name}</div>
        <div className="item-link-container">
          {link && (
            <a className="item-link" target="_blank" href={link}>
              Visit
            </a>
          )}
        </div>
      </div>

      <div className="item-botrow">
        <div className="item-type badge rounded-pill text-bg-info">{type}</div>
        <div className="item-actions">
          <button
            className="badge rounded-pill text-bg-warning"
            data-bs-toggle="modal"
            data-bs-target={`#editModal${id}`}
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
        id={`editModal${id}`}
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Update Recommendation
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
                <label className="form-label">Type</label>
                <select className="form-select" id="type">
                  {Object.values(Type).map((type) => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
                <label className="form-label">Description</label>
                <input
                  required={false}
                  className="form-control"
                  id="description"
                  defaultValue={description}
                />
                <label className="form-label">Link</label>
                <input
                  required={false}
                  className="form-control"
                  id="link"
                  defaultValue={link}
                />

                <button className="btn btn-primary">
                  Update Recommendation
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;
