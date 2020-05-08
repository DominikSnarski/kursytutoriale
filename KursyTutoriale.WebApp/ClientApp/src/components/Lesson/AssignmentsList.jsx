import React, {useState} from 'react';
import { Container, Table } from 'reactstrap';
import Assignment from './Assignment';

function AssignmentsList(){

    const [items] = useState([{reporter: 'Jurek', content: 'Przynioslem piwerko', date: '1999-04-25', rating: '?/5'}, {reporter: 'Jurek', content: 'Przynioslem piwerko i otwieracz', date: '1999-04-25', rating: '5/5'}, {reporter: 'Jurek', content: 'Przynioslem piwerko', date: '1999-04-25', rating: '4/5'}, {reporter: 'Jurek', content: 'Przynioslem na wpol wypite piwerko', date: '1999-04-25', rating: '2/5'}, {reporter: 'Jurek', content: 'Nie przynioslem piwerka', date: '1999-04-25', rating: '0/5'}]);

    return(
        <Container>
            <Table style={{ backgroundColor: 'transparent' }}>
              <thead>
                <tr>
                  <th>Reporter</th>
                  <th>Date</th>
                  <th>Answer</th>
                  <th>Rating</th>
                </tr>
              </thead>
              {items.map((item, i) => (
                <Assignment key={i} assignment={item} />
              ))}
            </Table>
        </Container>
    )
}

export default AssignmentsList;