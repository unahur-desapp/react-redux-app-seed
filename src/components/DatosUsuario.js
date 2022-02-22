import { Link, useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { Alert } from '@mui/material';
import { getUsuarioPorId } from '../services/usuarios';

export default function DatosUsuario() {
    const { id } = useParams();

    const [usuario, setUsuario] = useState(null);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        async function fetchUsuario() {
            try {
                const usuario = await getUsuarioPorId(id);
                setUsuario(usuario);
            } catch (err) {
                setHasError(true);
            }
        }
        fetchUsuario();
    }, [id]);

    const usuarioRendering = () => {
        return [
            <Card sx={{ maxWidth: 345 }} key="datosUsuario">
                <CardActionArea>
                    <CardMedia
                        component="img"
                        alt="Avatar"
                        height="300"
                        image={usuario.avatarUrl}
                        title="Avatar"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {`${usuario.nombre} ${usuario.apellido}`}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Nació el {usuario.fechaNacimiento}. Si aún viviera tendría{' '}
                            {usuario.edad} años.
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>,
            <Button color="primary" component={Link} to="/" key="botonVolver">
                Volver
            </Button>,
        ];
    };

    const errorRendering = () => {
        return (
            <Alert severity="warning">
                No pudimos cargar el usuario. ¿Levantaste la API?{' '}
                <span role="img" aria-label="thinking">
                    🤔
                </span>
            </Alert>
        );
    };

    const loadingRendering = () => {
        return <Alert severity="info">Cargando usuarie ...</Alert>;
    };

    return hasError
        ? errorRendering()
        : usuario == null
            ? loadingRendering()
            : usuarioRendering();
}
