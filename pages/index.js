import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import {
  Box,
  chakra,
  Flex,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiBookOpen } from 'react-icons/fi';
import HeaderAdmin from './components/header/headerAdmin';
import Link from 'next/link'; // Import Link dari Next.js
import firebaseApp from './api/firebase';

function StatsCard(props) {
  const { title, stat, icon } = props;
  return (
    <Stat
      px={{ base: 2, md: 4 }}
      py={'3'}
      mt={'1px'}
      shadow={'xl'}
      bgColor={'white'}
      border={'1px solid'}
      borderColor={useColorModeValue('gray.800', 'gray.500')}
      rounded={'lg'}>
      <Flex justifyContent={'space-between'}>
        <Box pl={{ base: 2, md: 4 }}>
          <StatLabel fontSize={'xl'} fontWeight={'medium'} isTruncated>
            {title}
          </StatLabel>
          <StatNumber fontSize={'md'} fontWeight={'medium'}>
            {stat}
          </StatNumber>
        </Box>
        <Box
          my={'auto'}
          color={useColorModeValue('gray.800', 'gray.200')}
          alignContent={'center'}>
          {icon}
        </Box>
      </Flex>
    </Stat>
  );
}

export default function BasicStatistics() {
  const [kitab, setKitab] = useState([]);

  useEffect(() => {
    const database = getDatabase(firebaseApp);
    const kitabRef = ref(database, 'kitab');

    onValue(kitabRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const kitabArray = Object.keys(data).map((id) => ({
          id, // Menggunakan kunci dari tabel sebagai properti 'id'
          ...data[id],
        }));
        setKitab(kitabArray);
      }
    });
  }, []);

  return (
    <>
      <HeaderAdmin/>
      <Box bgImage={'/img/background.svg'} minH={'780px'}>
        <Box maxW="7xl" mx={'auto'} pt={6} px={{ base: 2, sm: 12, md: 17 }} mb={'80px'}>
          <chakra.h1 textAlign={'center'} fontSize={'4xl'} mt={'60px'} mb={'15px'} fontWeight={'bold'}>
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </chakra.h1>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }} >
            {kitab.map((item) => (
              <Link href={`/kitab/${item.id}`} key={item.id}> 
              
                  <StatsCard title={item.namaKitab} stat={item.halaman} icon={<FiBookOpen size={'3em'} />} />
  
              </Link>
            ))}
          </SimpleGrid>
        </Box>
      </Box>
    </>
  );
}
