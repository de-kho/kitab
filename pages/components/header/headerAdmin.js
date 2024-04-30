import {
    Flex,
    Heading,
    Avatar,
    AvatarGroup,
    Text,
    Icon,
    IconButton,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Divider,
    Box,
    Button,
    Input,
    InputGroup,
    InputLeftElement,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Stack,
    FormLabel,
    InputLeftAddon,
    InputRightAddon,
    Select,
    Textarea,
    useDisclosure
} from '@chakra-ui/react'
import Link from 'next/link'

import { 
    FiMenu,
    FiSettings, 
    FiHome,
    FiFilePlus,
    FiShoppingBag,
    FiLogOut,
    FiTwitch,
    FiBell,
    FiCommand,
 } from 'react-icons/fi'

 import {useRef} from 'react'
 import Image from 'next/image'
 import { useRouter } from 'next/router'

function HeaderAdmin() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = useRef()
    const router = useRouter();

    const handleLogout = () => {
        // Hapus informasi login dari session storage
        sessionStorage.removeItem("isLoggedIn");
        sessionStorage.removeItem("expirationDate");
        router.push("/coba/login");
      };

    
    return(
        <>
             <Flex
                w={["100%", "100%", "100%"]}
                bgColor="#9C27B0"
                flexDir="column"
                overflow="auto"
                borderBottomRightRadius={'10px'}
                borderBottomLeftRadius={'10px'} 
                position="fixed"
                zIndex={'3'}
                minW={[null, null, "400px", "400px", "400px"]}
            >
                 <Flex alignContent="center" m={0} p={3}>
                 <InputGroup mb={0} mr={2}>
                                <IconButton icon={<FiHome color="white" size={'md'}/>} bgColor="#9C27B0" borderRadius="50%" p="7px" />
                                <Text color={'white'} my={'10px'} ml={'5px'}>
                                 Kitab Puput
                                </Text>
                </InputGroup>

                        
                 </Flex>
                </Flex>
        </>
    )
}

export default HeaderAdmin