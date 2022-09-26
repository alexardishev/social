import { Link } from 'react-router-dom';

import './link.scss'

const LinkBar = (props) => {
    return(
    <Link className= {`linkBar ${props.classNameSecond}`} onClick={props.click} to={`/${props.path}`}>
        {props.nameLink}
    </Link>
    )

}

export default LinkBar