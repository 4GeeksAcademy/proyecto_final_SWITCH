const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			navbar: "no token", // "token"  -------------- SOLO PARA TESTEAR
			token: null,
			userCreatedSuccess: false,
			userCreatedFailure: false,
			registrationSuccess: false,
			registrationExists: false,
			registrationEmpty: false,
			registrationInProgress: false,
			registrationDoesntExist: false,
			registrationWrong: false,

			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			setRegistrationEmpty: (value) => {
				setStore({ registrationEmpty: value });
			},
			setRegistrationSuccess: (value) => {
				setStore({ registrationSuccess: value });
			},
			setRegistrationExists: (value) => {
				setStore({ registrationExists: value });
			},
			setRegistrationInProgress: (value) => {
				setStore({ registrationInProgress: value });
			},
			setRegistrationDoesntExist: (value) => {
				setStore({ registrationInProgress: value });
			},
			setRegistrationWrong: (value) => {
				setStore({ registrationWrong: value });
			},
			

			/////////// CREATE USER IN DATABASE //////////////

			createNewUser: async (firstName, lastName, userName, email, password, city, role, gender, languages, photo_url) =>
			{
				const store = getStore();

				// Testing Input
				// return(console.log(firstName, lastName, userName, email, city, role, gender, languages, photo)) ✅

				// Variables for Fetch Request Body
				const fetchUrl = process.env.BACKEND_URL + "/api/CreateNewUserProfile";
				const fetchBody = {
					method: "POST",
					mode: "cors",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						first_name: firstName,
						last_name: lastName,
						user_name: userName,
						email: email,
						password: password, 
						city: city,
						role: role, 
						gender: gender, 
						languages: languages, 
						photo_url: photo_url
					})
				}
				console.log("fetchUrl:", fetchUrl)
				console.log("fetchBody:", fetchBody)

				// Fetch Request 
				try {
					const response = await fetch(fetchUrl, fetchBody);
					console.log("response:", response)
					const responseData = await response.json();
					console.log("responseData:", responseData)

					// Handling Different Outcomes 
					if(response.ok) {
						setStore({userCreatedSuccess: true})
					} 
					if(!response.ok) {
						const errorMessage = await response.text();
						console.log("errorMessage:", errorMessage);
						setStore({userCreatedFailure: true})
					}				
				} catch (error) {
					console.log('Error:', error)
					throw error
				}
			},

			/* 
				PROBLEMAS: 
				- CORs, autorización correcta entre frontend y backend
					--> POST funciona en POSTMAN pero no aquí 
				
				TODO:
				- Una vez la llamada funcione, hay que convertir "true" a True en el backend?
				- Comprueba lo que ve el usuario en el frontend después de una llamada éxistoso/fallida
					--> funcionan lo del 'setStore' y los useEffect en el archivo del formulario?

			*/

			/////////// REGISTER USER IN DATABASE //////////////

			register: async (email, password) => {
				const store = getStore();

				if (!email || !password) {
					setStore({ registrationEmpty: true });
					throw new Error("Email and password are required");
				}
				const requestOptions = {
					method: "Post",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: email,
						password: password,
						is_active: true,
					}),
				};

				try {
					const resp = await fetch(
						process.env.BACKEND_URL + "/api/user",
						requestOptions
					);

					if (resp.status !== 200) {
						alert("Email or password are wrong");
						return false;
					} else {
						setStore({ registrationSuccess: true });
					}

					const data = await resp.json();
					console.log("this came from the backend", data);

					// sessionStorage.setItem("token", data.access_token); //I know it's access_token cos I saw it in Postman/Google Network tool
					// setStore({ token: data.access_token });
					return true;
				} catch (error) {
					console.log("there has been an error signing up");
					setStore({ registrationExists: true });
				}
			},

			/////////// CHECK IF USER IN DATABASE + GET TOKEN //////////////

			login: async (email, password) => {
				const store = getStore();

				if (!email || !password) {
					setStore({ registrationEmpty: true });
					throw new Error("Email and password are required");
				}

				const requestOptions = {
					method: "Post",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: email,
						password: password,
					}),
				};

				try {
					const resp = await fetch(
						process.env.BACKEND_URL + "/api/token",
						requestOptions
					);

					if (resp.status !== 200) {
						setStore({ registrationWrong: true });
						return false;
					}

					const data = await resp.json();

					console.log(
						"this is what I get from the token endpoint, with the fetch in flux of function login",
						data
					);
					if (data.access_token != undefined) {
						sessionStorage.setItem("token", data.access_token); //I know it's access_token cos I saw it in Postman/Google Network tool
						setStore({ token: data.access_token }); // TOKEN IS NOT NULL ANYMORE, AND IS TRUE!
						setStore({ registrationSuccess: true });
						return true;
					}

					console.log("token undefined");
				} catch (error) {
					console.log("there has been an error logging in", error);
					setStore({ registrationDoesntExist: true });
				}
			},

			/////////// MAINTAIN TOKEN //////////////

			syncTokenFromSessionStore: () => {
				// in the appContext, cos needed everytime the page refreshes
				const token = sessionStorage.getItem("token");
				console.log(
					"Application just loaded, synching the session storage token"
				);
				if (token && token != "" && token != undefined)
					setStore({ token: token });
			},

			/////////// LOGOUT + REMOVE TOKEN //////////////

			logout: () => {
				sessionStorage.removeItem("token");
				console.log("logged out");
				setStore({ token: null });
				setStore({ message: null });

			},


			//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
			// FUNCIONES DE LA PLANTILLA

			// exampleFunction: () => {
			// 	getActions().changeColor(0, "green");
			// },

			// getMessage: async () => {
			// 	try {
			// 		// fetching data from the backend
			// 		const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
			// 		const data = await resp.json()
			// 		setStore({ message: data.message })
			// 		// don't forget to return something, that is how the async resolves
			// 		return data;
			// 	} catch (error) {
			// 		console.log("Error loading message from backend", error)
			// 	}
			// },

			// changeColor: (index, color) => {
			// 	//get the store
			// 	const store = getStore();

			// 	//we have to loop the entire demo array to look for the respective index
			// 	//and change its color
			// 	const demo = store.demo.map((elm, i) => {
			// 		if (i === index) elm.background = color;
			// 		return elm;
			// 	});

			// 	//reset the global store
			// 	setStore({ demo: demo });
			// }
		}
	};
};

export default getState;
