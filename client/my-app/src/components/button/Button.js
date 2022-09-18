const Button = (props) => {

    return(
        <button disabled={props.disabled} onClick={props.click} type={props.type} className={props.className}>{props.name}</button>
    )


}


export default Button