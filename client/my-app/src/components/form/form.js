
const Form = (props) => {
    return(
        <div className={props.classNameWrapper}>
        <form onSubmit={props.submit} className={props.classNameForm}>
                {props.children}
        </form>
        </div>
    )
  

}

export default Form