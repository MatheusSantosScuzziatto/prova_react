import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import writeJsonFile from 'write-json-file';

function Cadastro() {
    const [nome, setNome] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [cpf, setCpf] = React.useState("");
    const [telefone, setTelefone] = React.useState("");
    const data = require('./data/data.json');
    console.log(data);

    const useStyles = makeStyles((theme) => ({
        button: {
            margin: theme.spacing(1),
        },
    }));
    const classes = useStyles();

    const Save = (event) => {
        //alert("Salvou!")
        (async () => {
            await writeJsonFile('./data/data.json', {'nome': nome, 'email': email, 'cpf': cpf, 'telefone': telefone});
        })();
        event.preventDefault();
    }

    return (
        <div class="container-page">
            <h1> Cadastro de Clientes </h1>
            <div>
                <div>
                    <TextField id="nome" label="Nome" value={nome} onChange={e => setNome(e.target.value)} required fullWidth />
                </div>
                <div>
                    <TextField id="cpf" label="CPF" value={cpf} onChange={e => setCpf(e.target.value)} required fullWidth />
                </div>
                <div>
                    <TextField id="email" label="Email" value={email} onChange={e => setEmail(e.target.value)} required fullWidth />
                </div>
                <div>
                    <TextField id="telefone" label="Telefone" value={telefone} onChange={e => setTelefone(e.target.value)} required fullWidth />
                </div>
            </div>
            <div>
                <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    className={classes.button}
                    onClick={Save}>
                    Salvar
                </Button>
            </div>
        </div>
    );
}

export default withRouter(Cadastro);