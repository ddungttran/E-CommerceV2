import SignupForm from "../pages/SignupForm";



function Footer() {
  return (
    <footer className="footer">
      <div className="footer-nav-wrapper">
        <h3 className="footer-nav-heading">More Info</h3>
        <ul className="footer-nav">
          <li><a href="#" className="footer-nav-link">Company</a></li>
          <li><a href="#" className="footer-nav-link">Sales</a></li>
          <li><a href="#" className="footer-nav-link">Returns</a></li>
          <li><a href="#" className="footer-nav-link">Privacy Policy</a></li>
          <li><a href="/contact" className="footer-nav-link">Contact Us</a></li>
        </ul>
      </div>
      
      <SignupForm />

      <div className="contact-list-wrapper">
        <h3 className="contact-list-heading">Furniture Store</h3>
        <ul className="contact-list">
          <li><a href="#" className="contact-list-link">555 6666 7777</a></li>
          <li><a href="#" className="contact-list-link">info@gmail.com</a></li>
          <li><a href="#" className="contact-list-link">Charlotte, NC</a></li>
          <li><a href="#" className="contact-list-link">Free US Delivery</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
