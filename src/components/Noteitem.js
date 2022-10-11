import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext.js";
const Noteitem = props => {
  const { note, updateNote } = props;
  const context = useContext(noteContext);
  const { deleteNote } = context;
  
  return (
    <div className="col-xl-4">
      <div className="card shadow-lg p-2 mb-5 bg-body rounded">
        <div className="card-body">
          <div className="d-flex align-items-lg-stretch md-3">
            <h5 className="me-auto card-title">
              <strong>{note.title}</strong>
            </h5>
            <i
              className="fa-regular fa-trash-can mx-2 pt-1"
              onClick={() => {
                deleteNote(note._id);
              }}
            ></i>
            <i
              className="fa-regular fa-pen-to-square ms-2 pt-1"
              onClick={()=>updateNote(note)}
            ></i>
          </div>

          <p className="card-text">{note.description}</p>
          <div className="badge rounded-pill bg-warning text-dark">
            {note.tag}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
