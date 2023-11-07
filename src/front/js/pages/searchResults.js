import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const SearchResults = () => {
	const { store, actions } = useContext(Context);

	return (
		
		<>
		{/* SEARCH BAR */}
		<div className="p-2 bg-light position-relative rounded-3 shadow mx-sm-1 mx-md-5">
			<form className="form-inline d-flex flex-column flex-sm-row align-items-sm-center">
				<div className="flex-grow-1 form-group mb-2 mb-sm-0 me-sm-2">
					<input
						className="form-control mr-sm-2 py-2 px-4 text-16 bg-light input-activity"
						type="search"
						placeholder="Search for a group"
						aria-label="Search"
					/>
				</div>
				<div className="form-group flex-grow-1 mb-2 mb-sm-0 me-sm-2">
				<input
					className="form-control py-2 px-4 text-16 bg-light input-activity"
					type="text"
					placeholder="Location"
				/>
				</div>
				<button
				className="btn rounded-3 input-btn bg-dark-blue fw-bolder text-light mb-2 mb-sm-0 px-4 flex-grow-1"
				type="submit"
				>
				Encuentra tu grupo
				</button>
			</form>
		</div>
		</>
		
		
	);
};
