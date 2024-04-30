import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Stat, Box, Flex, StatLabel, StatNumber, Container} from '@chakra-ui/react';
import { FiBookOpen } from 'react-icons/fi';
import firebaseApp from '../api/firebase';
import NoHome from '../components/header/noHome';

export default function ReadPage() {
  const router = useRouter();
  const { id } = router.query;
  const [halaman, setHalaman] = useState(null);

  useEffect(() => {
    if (id) {
      const database = getDatabase(firebaseApp);
      const halamanRef = ref(database, `halaman/${id}`);
      
      onValue(halamanRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setHalaman(data);
        }
      });
    }
  }, [id]);

  return (
    <div>
        <NoHome/>
        {halaman && (
        <Stat
          key={halaman.id}
          px={{ base: 2, md: 4 }}
          py={'3'}
          shadow={'xl'}
          bgColor={'white'}
          border={'1px solid'}
          borderColor={'gray.800'}
          rounded={'lg'}>

            <Box pl={{ base: 2, md: 4 }} mt={'60px'} >
              <StatLabel fontSize={'2xl'} fontWeight={'medium'} textAlign={'center'}>
                {halaman.judul}
              </StatLabel>
              <StatNumber fontSize={'md'} fontWeight={'medium'}>
                    <Container borderTop={'2px solid #ddd'} minH={'420px'} mb={'20px'}>
                                <Box mt={'10px'} fontSize={'md'} whiteSpace={'pre-line'} dangerouslySetInnerHTML={{
                                    __html: halaman.isi_halaman,
                                }} />
                                
                    </Container>
              </StatNumber>
            </Box>
        
        </Stat>
      )}
    </div>
  );
}
