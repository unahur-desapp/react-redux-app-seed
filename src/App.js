import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import DatosUsuario from './components/DatosUsuario';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const rootCss = {
    marginTop: '50px',
};
const fixedHeaderCss = {
    marginBottom: '40px',
    fontSize: '30px',
    color: 'DarkRed',
    backgroundColor: 'Khaki',
    textAlign: 'center',
};

export default function App() {
    return (
        <Container maxWidth="xl" sx={rootCss}>
            <Box sx={fixedHeaderCss}>
                Este es un texto fijo, va por afuera de las rutas.
            </Box>
            <BrowserRouter>
                <Routes>
                    <Route path="/usuarios/:id" element={<DatosUsuario />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </BrowserRouter>
        </Container>
    );
}
