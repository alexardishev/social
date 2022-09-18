import './container.scss'

const Container = (props) => {
    return (
        <div className='wrapper_container'>
        {props.children}
        </div>
    )
}

export default Container;