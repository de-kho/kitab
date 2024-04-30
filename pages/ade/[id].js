import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getDatabase, ref, onValue, update, push } from 'firebase/database';
import {
    Flex,
    Box,
    Heading,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Link,
} from '@chakra-ui/react';
import firebaseApp from '../api/firebase';
import NoHome from '../components/header/noHome';

const EditPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [namaKitab, setNamaKitab] = useState('');
    const [halaman, setHalaman] = useState('');
    const [nomorHalaman, setNomorHalaman] = useState('');
    const [isiHalaman, setIsiHalaman] = useState('');
    const [halamanData, setHalamanData] = useState([]);
    const [judul, setJudul] = useState('')

    useEffect(() => {
        if (id) {
            const database = getDatabase(firebaseApp);
            const kitabRef = ref(database, `kitab/${id}`);

            const fetchData = onValue(kitabRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    setNamaKitab(data.namaKitab || '');
                    setHalaman(data.halaman || '');
                }
            }, {
                errorCallback: (error) => {
                    console.error('Terjadi kesalahan:', error);
                }
            });

            return () => fetchData();
        }
    }, [id]);

    useEffect(() => {
        const database = getDatabase(firebaseApp);
        const halamanRef = ref(database, `halaman`);
    
        const fetchData = onValue(halamanRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                // Filter halaman berdasarkan id_buku tertentu
                const idBuku = id; // Ganti dengan id_buku yang diinginkan
                const halamanList = Object.keys(data)
                    .filter(key => data[key].id_buku === idBuku)
                    .map(key => ({
                        id: key,
                        nomor_halaman: data[key].nomor_halaman,
                        isi_halaman: data[key].isi_halaman,
                        judul: data[key].judul,
                    }));
                setHalamanData(halamanList);
            }
        }, {
            errorCallback: (error) => {
                console.error('Terjadi kesalahan:', error);
            }
        });
    
        return () => fetchData();
    }, [id]);
    


    const handleSubmit = (e) => {
        e.preventDefault();

        if (!id) {
            console.error('ID tidak ditemukan');
            return;
        }

        const database = getDatabase();
        const kitabRef = ref(database, `kitab/${id}`);

        update(kitabRef, {
            namaKitab,
            halaman,
        })
        .then(() => {
            console.log('Data berhasil diperbarui!');
            router.push(`/ade/${id}`);
        })
        .catch((error) => {
            console.error('Terjadi kesalahan:', error);
        });
    };

    const handleTambahIsi = (e) => {
        e.preventDefault();

        const database = getDatabase(firebaseApp);
        const halamanRef = ref(database, `halaman`);

        push(halamanRef, {
            nomor_halaman: nomorHalaman,
            isi_halaman: isiHalaman,
            judul: judul,
        })
        .then(() => {
            console.log('Isi halaman berhasil ditambahkan!');
            setNomorHalaman('');
            setIsiHalaman('');
            setJudl('')
        })
        .catch((error) => {
            console.error('Terjadi kesalahan:', error);
        });
    };

    return (
        <Flex h="100vh" flexDir="column">
            <NoHome/>
            <Flex flex="1" justifyContent="center" alignItems="center">
                <Box w="50%" p="3">
                    <Heading mt={3} size="xs" mb="2">Edit Kitab</Heading>
                    <Box bg="white" borderRadius="md" boxShadow="md" p="4">
                        <form onSubmit={handleSubmit}>
                            <FormControl mb="2">
                                <FormLabel fontSize={'xs'}>Nama Kitab</FormLabel>
                                <Input type="text" fontSize={'xs'} value={namaKitab} onChange={(e) => setNamaKitab(e.target.value)} />
                            </FormControl>
                            <FormControl mb="2">
                                <FormLabel fontSize={'xs'}>Halaman</FormLabel>
                                <Input type="text" fontSize={'xs'} value={halaman} onChange={(e) => setHalaman(e.target.value)} />
                            </FormControl>
                            <Button type="submit" size={'sm'} fontSize={'xs'} colorScheme="teal">Simpan</Button>
                        </form>
                    </Box>
               
            <Box bg="white" borderRadius="md" boxShadow="md" p="4" mt="4">
                <Heading size="xs" mb="3">Tambah Isi Halaman</Heading>
                <form onSubmit={handleTambahIsi}>
                    <FormControl mb="2">
                        <FormLabel fontSize={'xs'}>Nomor Halaman</FormLabel>
                        <Input type="text" value={nomorHalaman} onChange={(e) => setNomorHalaman(e.target.value)} />
                    </FormControl>
                    <FormControl mb="2">
                        <FormLabel fontSize={'xs'}>Judul Halaman</FormLabel>
                        <Input type="text" value={judul} onChange={(e) => setJudul(e.target.value)} />
                    </FormControl>
                    <FormControl mb="2">
                        <FormLabel fontSize={'xs'}>Isi Halaman</FormLabel>
                        <Textarea value={isiHalaman} onChange={(e) => setIsiHalaman(e.target.value)} />
                    </FormControl>
                    <Button size={'sm'} fontSize={'xs'} type="submit" colorScheme="teal">Tambah Isi Halaman</Button>
                </form>
            </Box>
            <Box bg="white" borderRadius="md" boxShadow="md" p="4" mt="4">
                <Heading size="xs" mb="2">Daftar Isi Halaman</Heading>
                <Table variant='striped' size='md' colorScheme='teal'>
                    <Thead fontSize={'xs'}>
                        <Tr>
                            <Th>Judul</Th>
                            <Th>Isi Halaman</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                    {halamanData.map((halaman) => (
                        <Tr key={halaman.id} fontSize={'xs'}>
                            <Td>
                                <Link href={`/ade/halaman/${halaman.id}`}>
                                    {halaman.judul}
                                </Link>
                            </Td>
                            <Td>{halaman.isi_halaman}</Td>
                        </Tr>
                    ))}

                    </Tbody>
                </Table>
            </Box>
            </Box>
        </Flex>
        </Flex>
    );
};

export default EditPage;
