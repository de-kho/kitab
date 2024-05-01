import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Box, chakra, SimpleGrid, Stat, StatLabel, StatNumber, Flex} from '@chakra-ui/react';
import { FiBookOpen } from 'react-icons/fi';
import firebaseApp from '../api/firebase';
import NoHome from '../components/header/noHome';
import Link from 'next/link';

export default function HalamanDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [halamanData, setHalamanData] = useState([]);

  useEffect(() => {
    if (id) {
      const database = getDatabase(firebaseApp);
      const halamanRef = ref(database, 'halaman');
      
      // Mendapatkan data halaman berdasarkan id buku
      onValue(halamanRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const halamanList = Object.entries(data).map(([key, value]) => ({ id: key, ...value }));
          const filteredHalamanList = halamanList.filter(item => item.id_buku === id);
          setHalamanData(filteredHalamanList);
        }
      });
    }
  }, [id]);

  return (
    <>
    <NoHome/>
    <Box bgImage={'/img/background.svg'} minH={'780px'}>
      <Box maxW="7xl" mx={'auto'} pt={6} px={{ base: 2, sm: 12, md: 17 }} mb={'80px'}>
        <chakra.h1 textAlign={'center'} fontSize={'4xl'} mt={'60px'} mb={'15px'} fontWeight={'bold'}>
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </chakra.h1>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
          {halamanData.map((halaman) => (
               <Link href={`/read/${halaman.id}`} key={halaman.id}> 
        
                    <Stat
                    key={halaman.id}
                    px={{ base: 2, md: 4 }}
                    py={'3'}
                    mt={'1px'}
                    shadow={'xl'}
                    bgColor={'white'}
                    border={'1px solid'}
                    borderColor={'gray.800'}
                    rounded={'lg'}>
                    <Flex justifyContent={'space-between'}>
                        <Box pl={{ base: 2, md: 4 }}>
                        <StatLabel fontSize={'2xl'} fontWeight={'medium'} isTruncated>
                            {halaman.judul}
                        </StatLabel>
                        <StatNumber fontSize={'md'} fontWeight={'medium'}>
                            Halaman: {halaman.nomor_halaman}
                        </StatNumber>
                        </Box>
                        <Box
                        my={'auto'}
                        color={'gray.800'}
                        alignContent={'center'}>
                            <FiBookOpen size={'3em'} />
                        </Box>
                    </Flex>
                    </Stat>
            
                </Link>
          ))}
        </SimpleGrid>
      </Box>
    </Box>
    </>
  );
}
