import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { useState, useEffect } from 'react'  
import { withRouter, Link } from 'react-router-dom';
import DeleteOutlineOutlined from '@material-ui/icons/DeleteOutlineOutlined'
import EditOutlined from '@material-ui/icons/EditOutlined'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import writeJsonFile from 'write-json-file';

const columns = [
  { id: 'nome', label: 'Nome', minWidth: 200, align: 'left' },
  { id: 'email', label: 'E-Mail', minWidth: 200, align: 'left' },
  { id: 'cpf', label: 'CPF', minWidth: 100, align: 'center' },
  { id: 'telefone', label: 'Telefone', minWidth: 200, align: 'left' },
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

function Consulta() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const datajson = require('./data/data.json');

  useEffect(() => {    
    const GetData = async () => {    
      setData(datajson);    
    }  
    GetData(); 
  }, []); 

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const deleteHandler = (e,email) => {
    //find index of element
    var index = datajson.findIndex(e=>e.email==email);
    //copy array
    var newAray = datajson.slice();
    //delete element by index
    newAray.splice(index, 1);

    console.log(newAray);

    setData(newAray);

    (async () => {
        await writeJsonFile('./data/data.json', newAray);
    })();

    console.log(datajson);
  }

  return (
    <Paper className={classes.root}>
    <h1> Consulta de Clientes </h1>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }, {fontWeight: "bold"}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow >   
                  <TableCell align="left">{row.nome}</TableCell> 
                  <TableCell align="left">{row.email}</TableCell>
                  <TableCell align="center">{row.cpf}</TableCell>  
                  <TableCell align="left">{row.telefone}</TableCell>
                  <TableCell align="center">
                      <ListItemIcon onClick={e=>deleteHandler(e,e.email)}>
                          <DeleteOutlineOutlined/>
                      </ListItemIcon>

                      <Link to="/cadastro" className= { classes.link }>
                        <ListItemIcon edit>
                            <EditOutlined/>
                        </ListItemIcon>
                      </Link>
                  </TableCell>
              </TableRow> 
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 15]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export default withRouter(Consulta);