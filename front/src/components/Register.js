import React, { useState, useReducer, useEffect } from "react";
import axios from "axios";
import reducer from "../utils/reducer";

const BASE_URL = "https://looklock-backend.herokuapp.com";
export default function Register() {
  const [content, setContent] = useState();
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [imageObj, setImageObj] = useState();

  const [state, dispatch] = useReducer(reducer, {
    loading : false,
    data : null,
    error : null
  });

  const fetchImage = async () => {
    dispatch({type: 'LOADING'});
    try {
      const response = await axios.get(
        'https://looklock-backend.herokuapp.com/api/image'
      );
      dispatch({type:'SUCCESS', data:response.data});
      //setImageObj(response.data[0].img);
      console.log(response.data[0].img);
    } catch (e) {
      console.log(error);
      dispatch({type:'ERROR', error:e})
    }
  };

  useEffect(() =>{
    fetchImage();
  },[]);
  const {loading, data:image, error} = state;

  const [uploadedImg, setUploadedImg] = useState(null);

  const handleName= ({ target: { value } }) => setName(value);
  const handleDesc = ({ target: { value } }) => setDesc(value);

  const onChange = e => {
    setContent(e.target.files[0]);
  };
  const onSubmit = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", content); 
    formData.append("name", name);
    formData.append("description", desc);
    axios
      .post("https://looklock-backend.herokuapp.com/api/image", formData)
      .then(res => {
        console.log(res.data);
        alert("The file is successfully uploaded");
      })
      .catch(err => {
        console.error(err);
      });
  };


  if (loading) console.log("loading..");
  if (error) return <div>요청한 데이터가 없습니다. {error.message}</div>;
  if (!image) return <div> Loading.. </div>;

  const base64String = btoa(String.fromCharCode(...new Uint8Array(image[0].img.data.data)));

  return (
    <div>
      <div>
        <img src={`data:image/jpg;base64,${base64String}`} alt="" />
      </div>
        <form onSubmit={onSubmit}>
            <div>
                <label for="name">Image Title</label>
                <input type="text" id="name" placeholder="Name" 
                       value={name} name="name" onChange = {handleName}/>
            </div>
            <div>
                <label for="description">Image Description</label>
                <textarea id="description" name="description" value={desc} rows="2" 
                          placeholder="Description" onChange={handleDesc}>
                </textarea>
            </div>
            <div>
                <label for="image">Upload Image</label>
                <input type="file" id="image" 
                       name="image" required onChange={onChange}/>
            </div>
            <div>
                <button type="submit">Submit</button>
            </div>
        </form>
    </div>
  );
}