import React, { Fragment } from 'react';
import { Container , Table} from 'reactstrap';
import UsersListItem from './UsersListItem';

const API='https://localhost:44354/api';

class UsersList extends React.Component {
    constructor() {
        super();
        var exampleItems = [...Array(100)].map(i => ({ id: (i + 1), name: i, date:i }));
        this.state = {
            Items: exampleItems
        }    
    }
    componentDidMount(){
        fetch(API+"/UserList/GetNumberOfUsers")
        .then(response => response.json())
        .then(data => {  
    
            var numberOfUsers = data;
            fetch(API+"/UserList/GetUserList")
            .then(response => response.json())
            .then(data => {  
                var Items=[...Array(numberOfUsers).keys()].map(i => ({ id: (i + 1), 
                    name: data[i].name, 
                    surname:data[i].surname, 
                    description:data[i].description }));
                this.setState({ Items: Items});  
            })
        })
    }

    render() {
        return (
            <Container>
                <Table size="sm">
                <thead>
                    <tr>
                        <th scope="row">#</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Description</th>
                        <th></th>
                    </tr>
                </thead>
                {this.state.Items.map(item => 
                    <UsersListItem Item={item}/>)}
                </Table>
            </Container>
        );
    }
}

export default UsersList