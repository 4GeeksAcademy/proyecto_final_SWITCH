import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/footer.css";
import logo from "../../img/logo-switch-raya-blanca.png";


export const Footer = () => {
	return(
	<footer className="footer mt-auto py-3 text-center border-top border-dark">
		<div className="container text-center">
			<div className="row gap-4 flex-column flex-sm-row">
				<div className="col ">
					<img src={logo} height="50px" className="pb-2 footer-logo" />
					<p className="footer-text mx-5 mx-sm-0">
						Switch es una plataforma en la cual puedes buscar eventos de intercambios de idiomas, conocer a gente nueva y enriquecer tu experiencia del mundo.
					</p>
					<div className="d-flex justify-content-center gap-3">
						{/* Facebook */}
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="##000080" className="bi bi-facebook footer-icon" viewBox="0 0 16 16">
							<path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
						</svg>
						{/* Instagram */}
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="##000080" className="bi bi-instagram footer-icon" viewBox="0 0 16 16">
							<path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
						</svg>
						{/* Twitter/X */}
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="##000080" className="bi bi-twitter-x footer-icon" viewBox="0 0 16 16">
							<path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633Z" />
						</svg>
						{/* Youtube */}
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="##000080" className="bi bi-youtube footer-icon" viewBox="0 0 16 16">
							<path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408z" />
						</svg>
					</div>
				</div>
				<div className="col d-flex flex-column gap-2">
					<h6 className="footer-h6">Quicklinks</h6>
					<Link className="footer-text link-dark" to="/">Página Principal</Link>
					<Link className="footer-text link-dark" to="/CreateNewUserProfile">Registarse</Link>
					<Link className="footer-text link-dark" to="">Sobre Nosotros</Link>
					<Link className="footer-text link-dark" to="">Contáctanos</Link>
				</div>
				<div className="col d-flex flex-column">
					<h6 className="footer-h6">Información de contacto</h6>
					<p className="footer-text mb-0">Tel: +34 111 111 111</p>
					<p className="footer-text mb-0">switch-info@switch.com</p>
					<p className="footer-text mb-0">Cl. Edison, 3, 28006 Madrid</p>
					<p className="footer-text mb-0">Madrid, España</p>
				</div>
				<div className="col d-flex flex-column gap-2">
					<h6 className="footer-h6">Made with <i className="fa fa-heart text-danger" /> by</h6>
					<a className="footer-text link-dark" href="https://github.com/vanesascode" target="_blank">Vanesa Juarez Paris</a>
					<a className="footer-text link-dark" href="https://github.com/Paularicarte" target="_blank">Paula Ricarte</a>
					<a className="footer-text link-dark" href="https://github.com/marthaklie" target="_blank">Martha Klie Rosales</a>
					<a className="footer-text link-dark" href="https://github.com/gdwhittaker94" target="_blank">David Whittaker</a>
				</div>
			</div>
		</div>
	</footer> 
	)
};