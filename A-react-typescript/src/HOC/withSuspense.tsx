import Preloader from '../UI/components/common/Preloader/Preloader'
import React from 'react'

export function withSuspense(WrappedComponent: React.ComponentType<React.JSX.IntrinsicAttributes>) {
	return (props: React.JSX.IntrinsicAttributes) => {
		return (
			<React.Suspense fallback={<Preloader />}>
				<WrappedComponent {...props} />
			</React.Suspense>
		)
	}
}
