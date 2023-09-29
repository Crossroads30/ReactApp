import cl from './DialogMessage.module.css'

const DialogMessage = (props) => {
  return <div className={cl.message} id={props.id}>{props.message}</div>
}

export default DialogMessage