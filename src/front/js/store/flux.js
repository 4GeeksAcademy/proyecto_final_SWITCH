const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			events: [],
			filteredEvents: [],
			event: null,
			token: null,
			id_user: null,
			member: false,
			organizer: false,
			userCreatedSuccess: false,
			userCreatedFailure: false,
			userUpdatedSuccess: false,
			userUpdatedFailure: false,
			registrationSuccess: false,
			registrationExists: false,
			registrationEmpty: false,
			registrationInProgress: false,
			registrationDoesntExist: false,
			registrationWrong: false,
			message: null,
			// demo: [
			// 	{
			// 		title: "FIRST",
			// 		background: "white",
			// 		initial: "white"
			// 	},
			// 	{
			// 		title: "SECOND",
			// 		background: "white",
			// 		initial: "white"
			// 	}
			// ]
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

			///////////// Función para guardar inputs de la barra de busqueda ///////////////////////


			saveInputs: (value, targetName) => {
				setStore({ [targetName]: value });
			},

			///////////// GET FILTERED EVENTS ///////////////////////



			searchFilteredEvents: (city, eventName) => {
				console.log("event as parameter of the searchFilteredEvents function:", eventName)
				console.log("city as parameter of the searchFilteredEvents function:", city)
				fetch(`${process.env.BACKEND_URL}/api/allEvents`)
					.then((response) => {
						if (!response.ok) {
							throw new Error('Error fetching events');
						}
						return response.json();
					})
					.then((allEvents) => {
						let filteredEvents = allEvents;
						if (city !== null && eventName !== null) {
							filteredEvents = allEvents.filter(el => {
								const eventLocation = el.location.toLowerCase();
								const eventNameLowerCase = el.name.toLowerCase();
								return eventLocation.includes(city.toLowerCase()) && eventNameLowerCase.includes(eventName.toLowerCase());
							});
						}
						console.log("filtered Events in the searchFilteredEvents function: ", filteredEvents);
						setStore({ events: filteredEvents });

					})
					.catch((error) => {
						console.error("Error:", error);
					});
			},

			/////////////////////////  GET ALL THE EVENTS ///////////////////////

			searchAllEvents: () => {
				// Perform a fetch request to retrieve all events
				fetch(`${process.env.BACKEND_URL}/api/allEvents`)
					.then((response) => {
						if (!response.ok) {
							throw new Error('Error fetching events');
						}
						return response.json();
					})
					.then((allEvents) => {
						setStore({ events: allEvents });
						// console.log("All Events:", allEvents);
					})
					.catch((error) => {
						console.error("Error:", error);
					});
			},

			///////////// GET A PARTICULAR ONE EVENT  ///////////////////////

			searchEventById: (id) => {

				fetch(`${process.env.BACKEND_URL}/api/searchEvent/${id}`)
					.then((response) => {
						if (!response.ok) {
							throw new Error('Error fetching event');
						}
						return response.json();
					})
					.then((event) => {
						setStore({ event: event });
						console.log("Event correctly fetched:", event);
					})
					.catch((error) => {
						console.error("Error fetching individual event:", error);
					});
			},

			/////////// CREATE USER IN DATABASE //////////////

			createNewUser: async (firstName, lastName, userName, email, password, city, role, gender, languages, photo_url) => {
				const store = getStore();

				role = (role === 'true') ? true : false

				// Testing Input
				// (console.log(firstName, lastName, userName, email, city, role, gender, languages, photo_url)) 

				// Variables for Fetch Request Body
				const fetchUrl = process.env.BACKEND_URL + "/api/CreateNewUserProfile";
				const fetchBody = {
					method: "POST",
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
				// console.log("fetchUrl:", fetchUrl)
				// console.log("fetchBody:", fetchBody)

				// Fetch Request 
				try {
					const response = await fetch(fetchUrl, fetchBody);
					// console.log("response:", response)
					const responseData = await response.json();
					// console.log("responseData:", responseData)

					// Handling Different Outcomes 
					if (response.ok) {
						setStore({ userCreatedSuccess: true })
					}
					if (!response.ok) {
						const errorMessage = await response.text();
						console.log("errorMessage:", errorMessage);
						setStore({ userCreatedFailure: true })
					}
				} catch (error) {
					console.log('Error:', error)
					throw error
				}
			},

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

			/////////// GET ID USER & ROLE //////////////

			getIdUserAndRole: async (email) => {
				const store = getStore();
				// console.log("email:", email) 

				// Variables for Fetch Request Body
				const fetchUrl = process.env.BACKEND_URL + "/api/idUserAndRole";
				const fetchBody = {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						email: email,
					})
				}
				// console.log("fetchUrl:", fetchUrl)
				// console.log("fetchBody:", fetchBody)

				// Fetch Request 
				try {
					const response = await fetch(fetchUrl, fetchBody);
					// console.log("response:", response)
					const responseData = await response.json();
					// console.log("responseData:", responseData)
					// console.log("userId?", responseData.Id)

					// Handling Different Outcomes 
					if (response.ok) {
						setStore({ id_user: responseData.idUser });
					}
					if (!response.ok) {
						const errorMessage = await response.text();
						console.log("errorMessage:", errorMessage);
					}
					if (responseData.role){
						setStore({member: true})
						// console.log("member:", store.member)
					}
					if (!responseData.role){
						setStore({organizer: true})
						// console.log("organizer:", store.organizer)
					} 
				} catch (error) {
					console.log('Error:', error)
					throw error
				}

				// console.log("store_id_user:", store.id_user) 
			},

			/////////// UPDATE USER IN DATABASE //////////////

			updateUser: async (firstName, lastName, userName, email, password, city, role, gender, languages, photo_url) => {
				const store = getStore();

				role = (role === 'true') ? true : false
				let id_user = store.id_user

				// Testing Input
				// (console.log(firstName, lastName, userName, email, city, role, gender, languages, photo_url)) 

				// Variables for Fetch Request Body
				const fetchUrl = process.env.BACKEND_URL + `api/EditUserProfile/${id_user}`;
				const fetchBody = {
					method: "PUT",
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
				// console.log("fetchUrl:", fetchUrl)
				// console.log("fetchBody:", fetchBody)

				// Fetch Request 
				try {
					const response = await fetch(fetchUrl, fetchBody);
					console.log("response:", response)
					const responseData = await response.json();
					console.log("responseData:", responseData)

					// Handling Different Outcomes 
					if (response.ok) {
						setStore({ userUpdatedSuccess: true })
					}
					if (!response.ok) {
						const errorMessage = await response.text();
						console.log("errorMessage:", errorMessage);
						setStore({ userUpdatedFailure: true })
					}
				} catch (error) {
					console.log('Error:', error)
					throw error
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
