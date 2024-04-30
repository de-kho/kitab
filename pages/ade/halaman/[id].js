import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import {
    Flex,
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
} from '@chakra-ui/react';
import firebaseApp from '../../api/firebase';
import NoHome from '../../components/header/noHome';

const EditHalamanPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [nomorHalaman, setNomorHalaman] = useState('');
    const [isiHalaman, setIsiHalaman] = useState('');
    const [judul, setJudul] = useState('')

    useEffect(() => {
        if (id) {
            const database = getDatabase(firebaseApp);
            const halamanRef = ref(database, `halaman/${id}`);
            
            const fetchData = onValue(halamanRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setNomorHalaman(data.nomor_halaman || '');
                    setIsiHalaman(data.isi_halaman || '');
                    setJudul(data.judul || '')
                }
            }, {
                errorCallback: (error) => {
                    console.error('Terjadi kesalahan:', error);
                }
            });

            return () => fetchData();
        }
    }, [id]);

    const handleEditHalaman = (e) => {
        e.preventDefault();

        if (!id) {
            console.error('ID tidak ditemukan');
            return;
        }

        const database = getDatabase();
        const halamanRef = ref(database, `halaman/${id}`);

        update(halamanRef, {
            nomor_halaman: nomorHalaman,
            isi_halaman: isiHalaman,
            judul: judul,
        })
        .then(() => {
            console.log('Data halaman berhasil diperbarui!');
            router.push(`/ade/halaman/${id}`);
        })
        .catch((error) => {
            console.error('Terjadi kesalahan:', error);
        });
    };

    return (
        <>
         <NoHome/>
   
        <Flex h="100vh" alignItems="center" justifyContent="center">
            <Box w="50%" p="4">
                <Heading size="md" mb="4">Edit Halaman</Heading>
                <Box bg="white" borderRadius="md" boxShadow="md" p="4">
                    <form onSubmit={handleEditHalaman}>
                        <FormControl mb="4">
                            <FormLabel>Nomor Halaman</FormLabel>
                            <Input type="text" value={nomorHalaman} onChange={(e) => setNomorHalaman(e.target.value)} />
                        </FormControl>
                        <FormControl mb="4">
                            <FormLabel>Judul Halaman</FormLabel>
                            <Input type="text" value={judul} onChange={(e) => setJudul(e.target.value)} />
                        </FormControl>
                        <FormControl mb="4">
                            <FormLabel>Isi Halaman</FormLabel>
                            <Textarea value={isiHalaman} onChange={(e) => setIsiHalaman(e.target.value)} />
                        </FormControl>
                        <Button type="submit" colorScheme="teal">Simpan</Button>
                    </form>
                </Box>
            </Box>
        </Flex>
        </>
    );
};

export default EditHalamanPage;
