import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const Footer = () => {
  return (
    <MDBFooter  style={{width:"100%",height:"10rem"}}  className="transparent page-footer font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
          <MDBCol md="12" className="text-center">
            <h5 className="text-uppercase  mb-4 mt-3 font-weight-bold">
              Footer Content
            </h5>
            <p>
              Here you can use rows and columns here to organize your footer
              content. Lorem ipsum dolor sit amet, consectetur adipisicing
              elit.
            </p>
          </MDBCol>



      </MDBContainer>

    </MDBFooter>
  );
}

export default Footer;
