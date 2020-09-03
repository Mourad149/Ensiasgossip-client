import React from 'react'
import {MDBFileInput,MDBBtn,MDBRow} from 'mdbreact'
import {connect} from 'react-redux'
import Resizer from 'react-image-file-resizer';

const axios = require("axios");

class ImageUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            file: null
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onFormSubmit(e){
        e.preventDefault();
        const formData = new FormData();
        formData.append('myImage',this.state.file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axios.post("http://localhost:5000/upload",formData,config   )
              .then((response) => {
                console.log(response.data.file)
                this.props.uploadImage(response.data.file.id)
            }).catch((error) => {
        });
    }
    onChange(value) {
      Resizer.imageFileResizer(
               value[0],
               600,
               600,
               'JPEG',
               100,
               0,
               uri => {
                   this.setState({file:uri})
                   console.log(uri)
               }
           );
    }

    render() {
        return (
            <form  >
              <MDBRow className="d-flex justify-content-center align-items-center">
                < MDBFileInput type="file" name="myImage" textFieldTitle="Upload image"	 getValue= {this.onChange} onChange={this.onFormSubmit} btnColor="unique" btnTitle="CHOOSE IMAGE"/>

                <MDBBtn type="button" onClick={this.onFormSubmit} color="pink darken-4">Upload</MDBBtn>
              </MDBRow>
            </form>
        )
    }
}
const mapStatetoProps = state =>({
  image:state.ChatRoomReducer.image
})
const mapDispatchtoProps = dispatch =>({
    uploadImage:(image)=>dispatch({type:"UPLOAD",image:image})
})
export default connect(mapStatetoProps,mapDispatchtoProps)(ImageUpload);
