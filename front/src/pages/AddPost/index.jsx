import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import { selectIsAuth } from "../../redux/slices/auth";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../../axios";
export const AddPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);
  const imageUrl = "";
  const isEditing = Boolean(id);
  const [text, setText] = React.useState("");
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  React.useEffect(() => {
    if (id) {
      axios.get(`posts/${id}`).then(({ data }) => {
        setTitle(data.title);
        setText(data.text);
        setTags(data.tags);
      });
    }
  }, []);
  const onSubmit = async () => {
    try {
      const fields = { title, tags, text };
      console.log(fields);
      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post("/posts", fields);
      const _id = isEditing ? id : data._id;
      navigate(`/posts/${_id}`);
    } catch (err) {
      console.warn("Cant create post");
    }
  };

  const onChange = React.useCallback((text) => {
    setText(text);
    console.log(text);
  }, []);

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "`Text`...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    []
  );

  if (!localStorage.getItem("token") && !isAuth) {
    return <Navigate to="/" />;
  }

  return (
    <Paper style={{ padding: 30 }}>
      {/*<Button variant="outlined" size="large">*/}
      {/*  Upload Photo*/}
      {/*</Button>*/}
      {imageUrl && (
        <img
          className={styles.image}
          src={`http://localhost:4444${imageUrl}`}
          alt="Uploaded"
        />
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Tags"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth
      />
      <SimpleMDE
        className={styles.editor}
        value={text}
        onChange={onChange}
        options={options}
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained">
          {isEditing ? "Save" : "Upload"}
        </Button>
        <a href="/">
          <Button size="large">Cancel</Button>
        </a>
      </div>
    </Paper>
  );
};
