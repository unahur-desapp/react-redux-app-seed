import {
    Avatar,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    ListItemSecondaryAction,
    Alert,
} from '@mui/material';
import { DateTime } from 'luxon';
import { Face } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getTodosLosUsuarios } from '../services/usuarios';
import { getDataFromBackend } from '../config/config';

function fechaFormatoHumano(fecha) {
    return DateTime.fromISO(fecha)
        .setLocale('es')
        .toLocaleString(DateTime.DATE_FULL);
}

export default function ListadoUsuarios() {
    const [usuarios, setUsuarios] = useState(null);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        async function fetchUsuarios() {
            try {
                const usuarios = await getTodosLosUsuarios();
                setUsuarios(usuarios);
            } catch (err) {
                setHasError(true);
            }
        }
        fetchUsuarios();
    }, []);

    const usuariosRendering = () => {
        return [
            <Alert severity="info" sx={{width: '100%'}} key="alert">
                {getDataFromBackend
                    ? 'Los usuarios que están más abajo vienen de la API.'
                    : 'Estos usuarios son fijos'}
            </Alert>,
            <List sx={{flexGrow: 1}} key="usuarios">
                {usuarios.map((it, index) => (
                    <div key={it.id}>
                        <ListItem alignItems="flex-start">
                            <ListItemAvatar>
                                <Avatar src={it.avatarUrl} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={`${it.apellido}, ${it.nombre}`}
                                secondary={`Nació el ${fechaFormatoHumano(
                                    it.fechaNacimiento
                                )}.`}
                            />
                            <ListItemSecondaryAction>
                                <IconButton
                                    edge="end"
                                    component={Link}
                                    to={`/usuarios/${it.id}`}
                                >
                                    <Face />
                                </IconButton>
                                <Link style={{ marginLeft: '10px' }} to={`/usuarios/${it.id}`}>
                                    Ver detalle
                                </Link>
                            </ListItemSecondaryAction>
                        </ListItem>
                        {/* Hack para que no muestre el divider en el último elemento */}
                        {index !== usuarios.length - 1 && (
                            <Divider variant="inset" component="li" />
                        )}
                    </div>
                ))}
            </List>,
        ];
    };

    const errorRendering = () => {
        return (
            <Alert severity="warning">
                No pudimos cargar los usuarios. ¿Levantaste la API?{' '}
                <span role="img" aria-label="thinking">
                    🤔
                </span>
            </Alert>
        );
    };

    const loadingRendering = () => {
        return <Alert severity="info">Cargando usuaries ...</Alert>;
    };

    return (
        <Grid container>
            {hasError
                ? errorRendering()
                : usuarios == null
                    ? loadingRendering()
                    : usuariosRendering()}
        </Grid>
    );
}
