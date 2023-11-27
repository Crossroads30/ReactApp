import React from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'

type Navigate = {
  navigate: NavigateFunction
}

export const withNavigate = (WrappedComponent: React.ComponentType<React.JSX.IntrinsicAttributes & Navigate>) => {
	let RedirectTo = (props: React.JSX.IntrinsicAttributes) => {
		return <WrappedComponent {...props} navigate={useNavigate()} />
	}
	return RedirectTo
}
