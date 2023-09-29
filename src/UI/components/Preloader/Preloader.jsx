import cl from './Preloader.module.css'
import loader from '../../../assets/images/loading-gif-png-5.gif'

const Preloader = () => {
	return (
		<div>
			<img className={cl.loader} src={loader} />
		</div>
	)
}

export default Preloader
