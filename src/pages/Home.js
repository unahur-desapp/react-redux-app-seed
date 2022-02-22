import {
    Button,
    Card,
    CardContent,
    Grid,
    Typography,
} from '@mui/material';
import ListadoUsuarios from '../components/ListadoUsuarios';
import ProTip from '../components/ProTip';

function EjemploApi() {
    return (
        <Card sx={{ marginTop: '20px' }}>
            <CardContent>
                <ListadoUsuarios />
            </CardContent>
        </Card>
    );
}

function ClonarProyecto() {
    return (
        <>
            <ProTip />
            <Grid container justify="center">
                <Button
                    variant="contained"
                    color="primary"
                    href="https://github.com/unahur-desapp/react-redux-app-seed/generate"
                >
                    ¡Quiero crear mi proyecto!
                </Button>
            </Grid>
        </>
    );
}

export default function Home() {
    return (
        <>
            <Typography variant="h4" gutterBottom>
                Repositorio semilla React - Material UI 5 - Redux
            </Typography>
            <EjemploApi />
            <ClonarProyecto />
        </>
    );
}
