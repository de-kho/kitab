'use client';
import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  Table, TableContainer, Td, Th, TableCaption,Tfoot,Thead, Tr, Tbody,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { BsPerson } from 'react-icons/bs';
import { FiServer, FiBookOpen } from 'react-icons/fi';
import { GoLocation } from 'react-icons/go';
import HeaderAdmin from '../components/header/headerAdmin';
import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import Link from 'next/link';
import firebaseApp from '../api/firebase';


export default function BasicStatistics() {
    const [kitabData, setKitabData] = useState(null);

    useEffect(() => {

        const database = getDatabase(firebaseApp);
        
        // Mendengarkan perubahan pada database
        const fetchData = () => {
            const kitabRef = ref(database, 'kitab');
            onValue(kitabRef, (snapshot) => {
                const data = snapshot.val();
                setKitabData(data)
            });
        };

        // Memanggil fungsi fetchData untuk mengambil data
        fetchData();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // [] sebagai dependensi untuk memastikan pengambilan data hanya terjadi sekali saat komponen dimount

  return (
    <>
     <HeaderAdmin/>
     <Box bgImage={'/img/background.svg'} minH={'780px'}>
      <Box maxW="7xl" mx={'auto'} pt={6} px={{ base: 2, sm: 12, md: 17 }}>
        <chakra.h1 textAlign={'center'} fontSize={'4xl'} mt={'60px'} mb={'15px'} fontWeight={'bold'}>
        بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </chakra.h1>
        <TableContainer bgColor={'white'} p={'10px'}>
            <Table variant='striped' size='sm' colorScheme='teal'>
                <Thead>
                <Tr>
                    <Th>NAMA KITAB</Th>
                    <Th>HALAMAN</Th>
                    <Th isNumeric>Terbit</Th>
                </Tr>
                </Thead>
                <Tbody>
                {kitabData && Object.keys(kitabData).map((key) => (
                    <Tr key={key}>
                        <Td>
                            <Link href={`/ade/${key}`}>{kitabData[key].namaKitab}</Link>
                        </Td>
                        <Td>{kitabData[key].halaman}</Td>
                        <Td isNumeric>{kitabData[key].time}</Td>
                    </Tr>
                ))}
                </Tbody>
            </Table>
        </TableContainer>
      </Box>
      </Box>
    </>
  );
}
