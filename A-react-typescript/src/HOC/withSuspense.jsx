import Preloader from "../UI/components/common/Preloader/Preloader"
import React from "react"


export const withSuspense = (Component) => (props) => {

	return (

		<React.Suspense fallback={<Preloader/>}>
			<Component {...props} />
		</React.Suspense>

	)
}