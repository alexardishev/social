import './navbar.scss'

const Navbar = (props) => {
    return (
        <div className='navbar1'>
          <div className='navbar1_wrapper'>
          {props.children}  

          </div>
        </div>
    )
}

export default Navbar