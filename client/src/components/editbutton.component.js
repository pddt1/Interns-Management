import React from "react";

export default function EditButton(props) {
  return (
    <>
      {props.editable ? (
        <>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={props.handleUpdate}
            style={{ marginRight: "10px" }}
          >
            Update
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={props.handleCancel}
          >
            Cancel
          </button>
        </>
      ) : (
        <>
          <button
            id={props.id}
            type="button"
            className="btn btn-primary btn-sm "
            onClick={props.handleEdit}
            // style={{display: 'none'}}
          >
            Edit
          </button>
        </>
      )}
    </>
  );
}
