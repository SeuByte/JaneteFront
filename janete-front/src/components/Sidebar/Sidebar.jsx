import { Link } from "react-router-dom";

export default function Sidebar() {

    return (

        <nav
            style={{

                position:'fixed',

                left:0,

                top:0,

                width:'60px',

                height:'100%',

                background:'#2c3e50',

                color:'white',

                overflow:'hidden',

                transition:'0.3s'

            }}

            onMouseEnter={(e)=>e.currentTarget.style.width='200px'}

            onMouseLeave={(e)=>e.currentTarget.style.width='60px'}

        >

        <ul
            style={{

                listStyle:'none',

                padding:0,

                marginTop:'50px'

            }}
        >

            <li>

                <Link to="/">

                    📊 Relatório

                </Link>

            </li>



            <li>

                <Link to="/produtos">

                    📦 Produtos

                </Link>

            </li>



            <li>

                <Link to="/pedidos">

                    🛒 Pedidos

                </Link>

            </li>


        </ul>

        </nav>

    )

}