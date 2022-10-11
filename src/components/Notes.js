import React from "react";
import { useContext, useEffect, useRef, useState } from "react";
import {useNavigate} from "react-router-dom";
import noteContext from "../context/notes/noteContext.js";
import Noteitem from "./Noteitem.js";
import AddNote from "./AddNote.js";
const Notes = props => {
  const navigate = useNavigate();
  const context = useContext(noteContext);
  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: ""
  });
  const { notes, fetchNotes, editNote } = context;
  const ref = useRef(null);
  const refCancel = useRef(null);

  useEffect(() => {
    if(localStorage.getItem('token')){
      fetchNotes();
    }else{
      navigate("/login");
    }
    //eslint-disable-next-line
  }, []);

  const update = cnote => {
    setNote({
      id: cnote._id,
      etitle: cnote.title,
      edescription: cnote.description,
      etag: cnote.tag.substr(1)
    });
    ref.current.click();
  };

  const handleEditNote = e => {
    e.preventDefault();
    let newTag = note.etag.replace(/\s+/g, "");
    newTag = newTag.toLowerCase();
    editNote(note.id, note.etitle, note.edescription, "#" + newTag);
    refCancel.current.click();
    props.showAlert("Note Edited successfully.", "success");
  };
  const onChange = e => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container my-3 px-4 py-2">
        <AddNote showAlert={props.showAlert} />
      </div>
      <button
        className="btn"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
        style={{height:"0px",width:"0px"}}
      ></button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Title
                  </label>
                  <input
                    minLength={5}
                    required
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    value={note.etitle}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Description
                  </label>
                  <input
                    minLength={5}
                    required
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    onChange={onChange}
                    value={note.edescription}
                  />
                </div>
                <div className="mb-3">
                  <label
                    className="form-label"
                    htmlFor="specificSizeInputGroupUsername"
                  >
                    Update Tag
                  </label>
                  <div className="input-group">
                    <div className="input-group-text">#</div>
                    <input
                      type="text"
                      className="form-control"
                      id="etag"
                      name="etag"
                      placeholder="Tag"
                      onChange={onChange}
                      value={note.etag}
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refCancel}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleEditNote}
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-3 mb-5 px-5">
        <h2>
          <strong>Your saved Notes</strong>
        </h2>
        <div className="container mx-4">
          <h4>
            {notes.length === 0 && "No notes saved yet in the Note Bank!"}
          </h4>
        </div>
        {notes.map(e => {
          return <Noteitem note={e} key={e._id} updateNote={update} />;
        })}
      </div>
    </>
  );
};

export default Notes;
