const Input = (props) => {
    return(
        <div className={props.wrapperClassName}>
        <input 
            onBlur={props.onBlur}
            required
            type={props.type} 
            name={props.name}
            className={props.className}
            id={props.id}
            placeholder={props.placeholder}
            value={props.value}
            onChange={props.change}
            readOnly={props.readOnly}
            />
            
        <label htmlFor={props.htmlFor} className={props.labelClassName}>{props.label}</label>
    </div>
    )
}   

export default Input;