import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

function Students(props){
    

    return(
        <TableRow key={props.id}>
              <TableCell component="th" scope="row">
                {props.id}
              </TableCell>
              <TableCell align="right">{props.name}</TableCell>
              <TableCell align="right">{props.displayname}</TableCell>
              <TableCell align="right">{props.highschool}</TableCell>
              <TableCell align="right">{props.phone}</TableCell>
              <TableCell align="right">{props.email}</TableCell>
        </TableRow>
    );
}

export default Students;