import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { listar_produtos } from "../../services/produtosService";
import '../DashboardProdutosPage.css';
import '../navbardashboard.css';


export default function DashboardProdutosPage() {


    const [produtos, setProdutos] = useState([]);


    useEffect(() => {


        async function carregarProdutos() {


            try {


                const response = await listar_produtos();


                setProdutos(

                    response.data

                );


            }


            catch (error) {


                console.error(

                    error

                );


            }


        }


        carregarProdutos();


    }, []);



    return (


        <div style={{ display: 'flex' }}>



            {/* NAVBAR LATERAL FLUTUANTE */}
            <nav className="navbar-lateral">
                <ul>
                    {[
                        { name: 'Relatorio', path: '/dashboard', icon: '📊' },
                        { name: 'Produtos', path: '/dashboard-produtos', icon: '📦' },
                        { name: 'Clientes', path: '/Listadeclientes', icon: '👥' }
                    ].map((item) => (
                        <li key={item.name}>
                            <Link to={item.path}>
                                <span>{item.icon}</span>
                                <span style={{ marginLeft: '15px' }}>{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>




            <div className="dashboard-produtos-container">


                <h1>

                    Produtos Cadastrados

                </h1>



                <table>


                    <thead>


                        <tr>


                            <th>

                                Nome

                            </th>



                            <th>

                                Grupo

                            </th>



                            <th>

                                Unidade

                            </th>



                            <th>

                                Estoque

                            </th>



                            <th>

                                Valor

                            </th>


                        </tr>



                    </thead>



                    <tbody>



                        {


                            produtos.map(produto => (


                                <tr key={produto.id}>


                                    <td>

                                        {produto.Nome}

                                    </td>


                                    <td>

                                        {produto.Grupo}

                                    </td>



                                    <td>

                                        {produto.Unidade}

                                    </td>



                                    <td>

                                        {produto.Estoque}

                                    </td>



                                    <td>

                                        R$ {

                                            Number(

                                                produto.Valor_venda

                                            ).toFixed(2)

                                        }

                                    </td>


                                </tr>


                            ))



                        }



                    </tbody>


                </table>



            </div>



        </div>



    );


}