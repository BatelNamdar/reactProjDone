import PageHeader from "../common/pageHeader";

const AboutPage = () => {
  return (
    <>
      <PageHeader
        title="About"
        description="Unearth the story behind our digital haven. We're the dreamers, the makers, and the believers in the power of digital networking. Our mission is to revolutionize how you share your identity, one pixel at a time. Learn about the brains behind the beauty, and join us on this journey to redefine connections."
      />
      <div className="container-fluid">
        <div className="row w-100 h-100">
          <div className="col-md-6 col-sm-12 h-100 text-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387191.0360471489!2d-74.30932653769423!3d40.697539967187986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sil!4v1702319380568!5m2!1sen!2sil"
              style={{ width: "100%", height: "50%" }}
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
          <div className="col-md-6 col-sm-12 h-100 text-center ">
            <h4>why dont you give us a ring?</h4>
            <button className=" btn btn-success text-flush my-3 ">
              <a
                className="text-decoration-none text-dark"
                href="tel:052-555666555"
              >
                <i className="bi bi-telephone me-3"></i>
                052-555666555
              </a>
            </button>
            <br />
            <button className=" btn btn-success text-flush my-3">
              <a
                className="text-decoration-none text-dark"
                href="mailto:business@gmail.com"
              >
                <i className="bi bi-envelope me-3"></i>
                business@gmail.com
              </a>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
