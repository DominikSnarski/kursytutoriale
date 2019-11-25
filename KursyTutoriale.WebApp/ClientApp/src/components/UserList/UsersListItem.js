import React from 'react';
import { Table, Button} from 'reactstrap';

class UsersListItem extends React.Component {
    constructor(props){
        super(props);
        }

    render(){
        return (
        <tbody>
            <tr style={{ cursor: 'pointer' }}>
                <th scope="row">{this.props.Item.id}</th>
                <td>{this.props.Item.name}</td>
                <td>{this.props.Item.surname}</td>
                <td>{this.props.Item.description}</td>
                <td>
                    <Button color="primary" style={{float:"right"}}>Follow</Button>
                </td>
            </tr>
        </tbody>)
    }
}

export default UsersListItem