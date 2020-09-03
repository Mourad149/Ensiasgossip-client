
  const notify = type => {
    return () => {
      switch (type) {
        case 'info':
          toast.info('Info message', {
            closeButton: false
          });
          break;
        case 'success':
          toast.success('Success message', {
            closeButton: false
          });
          break;
        case 'warning':
          toast.warn('Warning message', {
            closeButton: false
          });
          break;
        case 'error':
          toast.error('Error message', {
            closeButton: false
          });
          break;
        default:
          toast.error('Error message', {
            closeButton: false
          });
      }
    };
  };

  return (
    <MDBContainer>
      <MDBBtn color='info' onClick={notify('info')}>
        Info
      </MDBBtn>
      <hr />
      <MDBBtn color='success' onClick={notify('success')}>
        Success
      </MDBBtn>
      <hr />
      <MDBBtn color='warning' onClick={notify('warning')}>
        Warning
      </MDBBtn>
      <hr />
      <MDBBtn color='danger' onClick={notify('error')}>
        Error
      </MDBBtn>
      <ToastContainer
        hideProgressBar={true}
        newestOnTop={true}
        autoClose={5000}
      />
    </MDBContainer>
  );
};

export default Notification;
