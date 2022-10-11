import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext.js";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleAddNote = e => {
    e.preventDefault();

    let newTag = note.tag.toLowerCase().replace(/\s+/g, "");
    
    addNote(note.title, note.description, "#" + newTag);
    setNote({title:"",description:"",tag:""});
    props.showAlert("Note Added to the note Bank.","success");
  };
  const onChange = e => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>
        <strong>Add a Note</strong>
      </h2>
      <div className="container my-3 px-5">
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Title
            </label>
            <input
              required
              minLength={5}
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onChange}
              value={note.title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Description
            </label>
            <input
              required
              minLength={5}
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onChange}
              value={note.description}
            />
          </div>
          <div className="mb-3">
            <label
              className="form-label"
              htmlFor="specificSizeInputGroupUsername"
            >
              Attach Tags
            </label>
            <div className="input-group">
              <div className="input-group-text">#</div>
              <input
                type="text"
                className="form-control"
                id="tag"
                name="tag"
                placeholder="Tag"
                onChange={onChange}
                value={note.tag}
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleAddNote}
            disabled={note.title.length < 5 || note.description.length < 5}
          >
            +Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
