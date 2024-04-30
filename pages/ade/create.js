import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { getDatabase, ref, push } from 'firebase/database';
import {
    Flex,
    Box,
    Heading,
    Avatar,
    Text,
    Button,
    Input,
    InputGroup,
    Grid,
    Container,
    InputLeftElement,
    SkeletonCircle,
    SkeletonText,
    Alert,
    Skeleton,
    Stack,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    useToast,
    AvatarBadge,
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Textarea,
    Radio, RadioGroup,
} from '@chakra-ui/react'
import NoHome from '../components/header/noHome'
import firebaseApp from '../api/firebase';

function AturSetting() {
  const [namaKitab, setTitle] = useState('')
  const [halaman, setDesc] = useState('')
  const router = useRouter()
  const { id } = router.query


  const monthNames = {
    0: 'Januari',
    1: 'Februari',
    2: 'Maret',
    3: 'April',
    4: 'Mei',
    5: 'Juni',
    6: 'Juli',
    7: 'Agustus',
    8: 'September',
    9: 'Oktober',
    10: 'November',
    11: 'Desember',
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
  
    return `${day} ${monthNames[monthIndex]} ${year}`;
  };


  const handleSubmit = (e) => {
        e.preventDefault()

        // Inisialisasi referensi database
        const database = getDatabase(firebaseApp);

        // Mendapatkan timestamp saat ini
        const time = formatDate(new Date());

        // Mendapatkan referensi ke lokasi 'kitab' di database
        const kitabRef = ref(database, 'kitab');

        // Menambahkan data baru ke Firebase Realtime Database
        push(kitabRef, {
            namaKitab: namaKitab,
            halaman: halaman,
            time: time
        })
        .then(() => {
            // Jika data berhasil ditambahkan, lakukan hal yang sesuai di sini
            console.log('Data berhasil ditambahkan!');
            // Reset form
            setNamaKitab('');
            setHalaman('');
            // Redirect atau navigasi ke halaman lain
            router.push('/ade/');
        })
        .catch((error) => {
            // Jika terjadi kesalahan, tangani di sini
            console.error('Terjadi kesalahan:', error);
            router.push('/ade/')
        });
    }

      
      
      return (
      <>

        <Flex
            h={[null, null, "100vh"]}
            maxW="2000px"
            flexDir={["column", "column", "column"]}
            overflow="hidden"
        >
            {/* Header */}
               <NoHome/>
           
        
                 {/* Container */}
                 <Flex
                    w={["100%", "100%", "35%"]}
                    background="#c7b5e6"
                    bgImage={'/img/background.svg'}
                    backgroundSize='auto'
                    backgroundRepeat={'repeat'}
                    p="5"
                    flexDir="column"
                    mt={'49px'}
                    overflow="auto"
                    minH={'600px'}
                    minW={[null, null, "400px", "400px", "400px"]}
                >
              
                    <Box my={4} bgColor={'#fff'} borderRadius={'10px'} border={'1px solid #eee'}>
                    <Heading ps={4} letterSpacing="tight" size="sm" my={4}>Tambah Pemberitahuan</Heading>
                    <Flex p={'6px'} mb={'13px'} justifyContent={'center'} bgColor={'#673ab7'}>

                          <Avatar>
                            <AvatarBadge borderColor='papayawhip' bg='tomato' boxSize='1.25em' /> 
                          </Avatar> 
                          <Text fontWeight={'bold'} textColor={'white'} fontSize={'10px'} ml={'15px'} alignSelf={'center'}>
                              TAMBAH NOTIFIKASI <br/>
                          </Text>
                
                        </Flex>
                        <Box p={'10px'}>
                            <form onSubmit={handleSubmit}>
                            <FormControl>
                                    <FormLabel>Title</FormLabel>
                                    <Input placeholder='Isi Judul' type='text' value={namaKitab} onChange={(e) => setTitle(e.target.value)}  />
                                </FormControl>
                                <FormControl mt={'5px'}>
                                    <FormLabel>description</FormLabel>
                                    <Textarea placeholder='Isi Deskripsinya' height={'300px'} size='md' type='text' value={halaman} onChange={(e) => setDesc(e.target.value)} />
                                </FormControl>
                         
                                <Button width={'100%'} mt={'10px'} colorScheme='teal' type='submit' size='md'>SAVE</Button>
                            </form>
  
                        </Box>
                              
                    </Box>
                
            </Flex>
      
        </Flex>

      </>
      )
      }
    
      
      export default AturSetting