import { Button } from "semantic-ui-react";
import { MovieDto } from "../../models/movieDto"
import apiConnector from "../../api/apiConnector";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { token } from "../../models/token";

interface Props {
    movie: MovieDto;
}
export default function MovieTableItems({ movie }: Props) {
    
    function logoutHandler()
    {
        localStorage.removeItem("token");
    }
    return (
        <>
            <tr className="center aligned">
                <td data-label="Id" >{movie.id} </td>
                <td data-label="Title" >{movie.title} </td>
                <td data-label="Description" >{movie.description} </td>
                <td data-label="CreateDate" >{movie.createDate} </td>
                <td data-label="Category" >{movie.category} </td>
                <td data-label="Action" >
                    <Button as={NavLink} to={`editMovie/${movie.id}`} color="yellow" type="submit" >Edit</Button>
                    <Button color="red" type="button" negative onClick={async () => {

                        const storedToken: token = JSON.parse(localStorage.getItem("token") as string);
                        axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
 
                        await apiConnector.deleteMovie(movie.id!)
                        window.location.reload();
                    }} >Delete</Button>
                     <Button as={NavLink} to={`/`} type="submit" color="orange"  onClick={ async () =>logoutHandler() } >Logout</Button>
                  
                </td>
            </tr>
        </>
    )
}